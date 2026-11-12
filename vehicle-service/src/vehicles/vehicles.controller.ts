import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VehiclesService } from './vehicles.service.js';
import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { UpdateVehicleDto } from './dto/update-vehicle.dto.js';

@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @MessagePattern('createVehicle')
  create(@Payload() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @MessagePattern('findAllVehicles')
  findAll() {
    return this.vehiclesService.findAll();
  }

  @MessagePattern('findOneVehicle')
  findOne(@Payload() id: number) {
    return this.vehiclesService.findOne(id);
  }

  @MessagePattern('updateVehicle')
  update(@Payload() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(updateVehicleDto.id, updateVehicleDto);
  }

  @MessagePattern('removeVehicle')
  remove(@Payload() id: number) {
    return this.vehiclesService.remove(id);
  }
}
