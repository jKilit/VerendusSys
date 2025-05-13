import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Vehicle } from '../models/Vehicle';
import { VehicleService } from '../services/VehicleService';

/**
 * GraphQL resolvers for vehicle-related queries. Handles data fetching and business logic
 * for vehicle operations, including retrieving all vehicles and individual vehicle details.
 */

@Resolver()
export class VehicleResolver {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService('./data/vehicles.txt');
  }

  @Query(() => [Vehicle])
  async vehicles(): Promise<Vehicle[]> {
    await this.vehicleService.loadVehicles();
    return this.vehicleService.getVehiclesSortedByInspection();
  }

  @Query(() => Vehicle, { nullable: true })
  async vehicle(@Arg('chassisNumber') chassisNumber: string): Promise<Vehicle | undefined> {
    await this.vehicleService.loadVehicles();
    return this.vehicleService.getVehicleByChassisNumber(chassisNumber);
  }
}
