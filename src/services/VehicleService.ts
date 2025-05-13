import { Vehicle } from '../models/Vehicle';
import { FileParser } from '../utils/fileParser';

/**
 * Core service for managing vehicle data. Handles CRUD operations, data persistence,
 * and business logic for vehicle management. Manages the vehicles.txt file operations.
 */


export class VehicleService {
  private vehicles: Map<string, Vehicle> = new Map();
  private dataFilePath: string;

  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;
  }

  async loadVehicles(): Promise<void> {
    try {
      const vehicles = await FileParser.parseVehicleFile(this.dataFilePath);
      this.vehicles.clear();
      vehicles.forEach(vehicle => {
        this.vehicles.set(vehicle.chassisNumber, vehicle);
      });
    } catch (error) {
      console.error('Error loading vehicles:', error);
      throw error;
    }
  }

  async updateFromFile(filePath: string): Promise<{ added: number; updated: number }> {
    const newVehicles = await FileParser.parseVehicleFile(filePath);
    let added = 0;
    let updated = 0;

    for (const newVehicle of newVehicles) {
      const existingVehicle = this.vehicles.get(newVehicle.chassisNumber);
      
      if (!existingVehicle) {
        this.vehicles.set(newVehicle.chassisNumber, newVehicle);
        added++;
      } else if (this.hasVehicleChanged(existingVehicle, newVehicle)) {
        this.vehicles.set(newVehicle.chassisNumber, newVehicle);
        updated++;
      }
    }

    return { added, updated };
  }

  private hasVehicleChanged(existing: Vehicle, newVehicle: Vehicle): boolean {
    return (
      existing.nextInspection !== newVehicle.nextInspection ||
      existing.lastInspection !== newVehicle.lastInspection ||
      existing.lastRegistration !== newVehicle.lastRegistration
    );
  }

  getVehiclesSortedByInspection(): Vehicle[] {
    return Array.from(this.vehicles.values())
      .sort((a, b) => a.nextInspection.localeCompare(b.nextInspection));
  }

  getVehicleByChassisNumber(chassisNumber: string): Vehicle | undefined {
    return this.vehicles.get(chassisNumber);
  }
}
