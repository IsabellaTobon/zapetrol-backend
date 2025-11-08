import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StationDetailsDto } from './dto/station-details.dto';
import { StationDetailsResponse } from './types/station-details.response';

@Injectable()
export class StationsService {
  private readonly logger = new Logger(StationsService.name);
  private readonly apiBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiBaseUrl = this.configService.get<string>('API_BASE_URL')!;
  }

  // Convierte strings numéricos a number o devuelve undefined si no aplica
  private toNumber(value?: string): number | undefined {
    if (!value) return undefined;
    const n = Number(value);
    return Number.isNaN(n) ? undefined : n;
  }

  // GET /estaciones/detalles/:idEstacion
  // Llama a la API externa, valida respuesta y devuelve datos limpios
  async getStationDetailsById(stationId: number): Promise<StationDetailsDto> {
    this.logger.log(`Obteniendo detalles de estación con id=${stationId}`);

    const url = `${this.apiBaseUrl}/estaciones/detalles/${stationId}`;
    let response: Response;

    try {
      response = await fetch(url);
    } catch (err) {
      this.logger.error(
        `Error de red al conectar con la API externa: ${(err as Error).message}`,
      );
      throw new InternalServerErrorException(
        'Error al conectar con la API externa',
      );
    }

    if (response.status === 404) {
      this.logger.warn(
        `Estación no encontrada en la API externa (id=${stationId})`,
      );
      throw new NotFoundException('Estación no encontrada');
    }

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      this.logger.error(
        `Error HTTP ${response.status} desde la API externa — cuerpo: ${body}`,
      );
      throw new InternalServerErrorException(
        'Error al obtener los datos de la estación',
      );
    }

    const raw = (await response.json()) as StationDetailsResponse;

    // Retornamos directamente el objeto con nombres limpios y tipos correctos
    return {
      stationId: raw.idEstacion,
      stationName: raw.nombreEstacion,
      longitude: Number(raw.longitud),
      latitude: Number(raw.latitud),
      side: raw.margen,
      postalCode: raw.codPostal,
      address: raw.direccion,
      openingHours: raw.horario,
      saleType: raw.tipoVenta,
      municipalityId: raw.idMunicipio,
      lastUpdate: raw.lastUpdate,
      locality: raw.localidad,
      Gasoline95: this.toNumber(raw.Gasolina95),
      Gasoline95_avg: this.toNumber(raw.Gasolina95_media),
      Gasoline98: this.toNumber(raw.Gasolina98),
      Gasoline98_avg: this.toNumber(raw.Gasolina98_media),
      Diesel: this.toNumber(raw.Diesel),
      Diesel_avg: this.toNumber(raw.Diesel_media),
      DieselPremium: this.toNumber(raw.DieselPremium),
      DieselPremium_avg: this.toNumber(raw.DieselPremium_media),
      DieselB_avg: this.toNumber(raw.DieselB_media),
      LPG_avg: this.toNumber(raw.GLP_media),
      province: raw.provincia,
      provinceDistrict: raw.provinciaDistrito,
      brand: raw.marca,
    };
  }
}
