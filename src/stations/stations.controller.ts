import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  findAll() {
    return this.stationsService.getAllStations();
  }

  // Busca estaciones cercanas a unas coordenadas
  // GET /stations/nearby?latitud=40.4&longitud=-3.7&radio=10
  @Get('nearby')
  findNearby(
    @Query('latitud') latitud: string,
    @Query('longitud') longitud: string,
    @Query('radio') radio?: string,
  ) {
    return this.stationsService.getNearbyStations(
      parseFloat(latitud),
      parseFloat(longitud),
      radio ? parseFloat(radio) : 5,
    );
  }

  //  Obtiene todas las estaciones de una provincia
  //  GET /stations/provincia/Zaragoza
  @Get('provincia/:provincia')
  findByProvincia(@Param('provincia') provincia: string) {
    return this.stationsService.getByProvincia(provincia);
  }

  // Obtiene todas las estaciones de una localidad
  // GET /stations/localidad/Utebo
  @Get('localidad/:localidad')
  findByLocalidad(@Param('localidad') localidad: string) {
    return this.stationsService.getByLocalidad(localidad);
  }

  // Obtiene los detalles de una estación específica
  // GET /stations/123
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stationsService.getStationById(id);
  }
}
