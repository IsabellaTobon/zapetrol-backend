import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StationDetailsDto } from './dto/station-details.dto';
import { StationsService } from './stations.service';
import { StationHistoryDto } from './dto/station-history.dto';
import { StationsByMunicipalityDto } from './dto/stations-by-municipality.dto';
import { StationInRadiusDto } from './dto/stations-in-radius.dto';

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

  // GET /estaciones/historico/:idEstacion?inicio&fin
  @Get('historico/:idEstacion')
  getHistory(
    @Param('idEstacion', ParseIntPipe) stationId: number,
    @Query('inicio') start?: string,
    @Query('fin') end?: string,
  ): Promise<StationHistoryDto> {
    return this.stationsService.getStationHistoryById(stationId, start, end);
  }

  // GET /estaciones/municipio/:idMunicipio
  @Get('municipio/:idMunicipio')
  getByMunicipality(
    @Param('idMunicipio', ParseIntPipe) municipalityId: number,
  ): Promise<StationsByMunicipalityDto[]> {
    return this.stationsService.getStationsByMunicipality(municipalityId);
  }

  // GET /estaciones/radio?latitud&longitud&radio&page&limit
  @Get('radio')
  getByRadius(
    @Query('latitud', ParseFloatPipe) latitude: number,
    @Query('longitud', ParseFloatPipe) longitude: number,
    @Query('radio', ParseFloatPipe) radius: number,
    @Query('page') pageStr?: string,
    @Query('limit') limitStr?: string,
  ): Promise<StationInRadiusDto[]> {
    const page = pageStr !== undefined ? Number(pageStr) : undefined;
    const limit = limitStr !== undefined ? Number(limitStr) : undefined;

    return this.stationsService.getStationsInRadius(
      latitude,
      longitude,
      radius,
      page,
      limit,
    );
  }
}
