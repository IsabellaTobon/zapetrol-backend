import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StationRaw } from './types/station-raw.type';

@Injectable()
export class StationsService {
  // Registrar eventos y errores
  private readonly logger = new Logger(StationsService.name);

  private readonly apiUrl: string;

  constructor(private configService: ConfigService) {
    // Obtenemos URL base API desde variable de entorno
    this.apiUrl = this.configService.get<string>('API_BASE_URL')!;
  }

  async getAllStations(): Promise<StationRaw[]> {
    try {
      this.logger.log('Obteniendo todas las estaciones...');
      const response = await fetch(`${this.apiUrl}/estaciones`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return (await response.json()) as StationRaw[];
    } catch (error) {
      this.logger.error('Error al obtener todas las estaciones', error);
      throw error;
    }
  }

  async getStationById(id: number): Promise<StationRaw> {
    try {
      this.logger.log(`Obteniendo detalles de la estación ${id}...`);
      const response = await fetch(`${this.apiUrl}/estaciones/detalles/${id}`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return (await response.json()) as StationRaw;
    } catch (error) {
      this.logger.error(`Error al obtener estación con ID ${id}`, error);
      throw error;
    }
  }

  async getNearbyStations(
    latitud: number,
    longitud: number,
    radio: number = 5,
  ): Promise<StationRaw[]> {
    try {
      this.logger.log(
        `Buscando estaciones cercanas a lat:${latitud}, lon:${longitud}, radio:${radio}km...`,
      );

      const url = `${this.apiUrl}/estaciones/cercanas?latitud=${latitud}&longitud=${longitud}&radio=${radio}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return (await response.json()) as StationRaw[];
    } catch (error) {
      this.logger.error('Error al obtener estaciones cercanas', error);
      throw error;
    }
  }

  async getByProvincia(provincia: string): Promise<StationRaw[]> {
    try {
      this.logger.log(`Buscando estaciones en la provincia: ${provincia}...`);
      const response = await fetch(
        `${this.apiUrl}/estaciones/provincia/${encodeURIComponent(provincia)}`,
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return (await response.json()) as StationRaw[];
    } catch (error) {
      this.logger.error(
        `Error al obtener estaciones de la provincia ${provincia}`,
        error,
      );
      throw error;
    }
  }

  async getByLocalidad(localidad: string): Promise<StationRaw[]> {
    try {
      this.logger.log(`Buscando estaciones en la localidad: ${localidad}...`);
      const response = await fetch(
        `${this.apiUrl}/estaciones/localidad/${encodeURIComponent(localidad)}`,
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return (await response.json()) as StationRaw[];
    } catch (error) {
      this.logger.error(
        `Error al obtener estaciones de la localidad ${localidad}`,
        error,
      );
      throw error;
    }
  }
}
