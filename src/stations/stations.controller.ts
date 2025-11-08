import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StationDetailsDto } from './dto/station-details.dto';
import { StationsService } from './stations.service';

@Controller('estaciones')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  // GET /estaciones/detalles/:idEstacion
  @Get('detalles/:idEstacion')
  getDetails(
    @Param('idEstacion', ParseIntPipe) stationId: number,
  ): Promise<StationDetailsDto> {
    return this.stationsService.getStationDetailsById(stationId);
  }
}
