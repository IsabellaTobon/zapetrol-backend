import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StationDetailsDto } from './dto/station-details.dto';
import { StationDetailsResponse } from './types/station-details.response';
import axios, { AxiosInstance, isAxiosError } from 'axios';

@Injectable()
export class StationsService {
  private readonly logger = new Logger(StationsService.name);
  private readonly client: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    const baseURL = this.config.get<string>('API_BASE_URL');
    if (!baseURL) throw new Error('API_BASE_URL is not defined');
    this.client = axios.create({ baseURL, timeout: 10_000 });
  }

  // Convierte strings numéricos a number o devuelve undefined
  private toNumber(value?: string): number | undefined {
    // if (!value) return undefined; #Menos robusta
    if (value === undefined || value === null || value === '') return undefined;
    const n = Number(value);
    return Number.isNaN(n) ? undefined : n;
  }

  // Manejo centralizado de errores de axios
  private handleAxiosError(err: unknown, notFoundMsg?: string): never {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      const body: unknown = err.response?.data;
      this.logger.error(
        `Upstream error ${status} — body: ${JSON.stringify(body)}`,
      );
      if (status === 404 && notFoundMsg)
        throw new NotFoundException(notFoundMsg);
      throw new InternalServerErrorException('Error en servicio externo');
    }
    this.logger.error((err as Error).message);
    throw new InternalServerErrorException('Error inesperado');
  }

  // GET /estaciones/detalles/:idEstacion
  // Llama a la API externa, valida respuesta y devuelve datos limpios
  async getStationDetailsById(stationId: number): Promise<StationDetailsDto> {
    this.logger.log(`Obteniendo detalles estación id=${stationId}`);
    try {
      const { data: raw } = await this.client.get<StationDetailsResponse>(
        `/estaciones/detalles/${stationId}`,
      );
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
    } catch (err) {
      this.handleAxiosError(err, 'Estación no encontrada');
    }
  }
}
