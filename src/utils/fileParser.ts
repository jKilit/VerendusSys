import { Vehicle } from '../models/Vehicle';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility class for parsing vehicle data from text files. Converts raw text data
 * into structured Vehicle objects according to the specified format.
 */

export class FileParser {
  static parseVehicleLine(line: string): Vehicle {
    return new Vehicle({
      identity: line.substring(0, 7).trim(),
      chassisNumber: line.substring(7, 26).trim(),
      modelYear: parseInt(line.substring(26, 30)),
      typeApprovalNumber: parseInt(line.substring(30, 41)),
      firstRegistration: line.substring(41, 49),
      privatelyImported: line.substring(49, 50) === '1',
      deregisteredDate: line.substring(50, 58).trim() || undefined,
      color: line.substring(58, 78).trim(),
      lastInspection: line.substring(78, 86),
      nextInspection: line.substring(86, 94),
      lastRegistration: line.substring(94, 102),
      monthlyRegistration: line.substring(102, 106)
    });
  }

  static async parseVehicleFile(filePath: string): Promise<Vehicle[]> {
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.promises.readFile(absolutePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    return lines.map(line => this.parseVehicleLine(line));
  }
}
