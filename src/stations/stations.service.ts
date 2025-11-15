import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, isAxiosError } from 'axios';

import { StationDetailsResponse } from './types/station-details.response';
import { StationDetailsDto } from './dto/station-details.dto';

import { StationHistoryResponse } from './types/station-history.response';
import { StationHistoryDto } from './dto/station-history.dto';

import { StationsByMunicipalityResponse } from './types/stations-by-municipality.response';
import { StationsByMunicipalityDto } from './dto/stations-by-municipality.dto';

import { StationInRadiusResponse } from './types/stations-in-radius.response';
import { StationInRadiusDto } from './dto/stations-in-radius.dto';

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

  // GET /estaciones/historico/:idEstacion?inicio&fin
  async getStationHistoryById(
    stationId: number,
    start?: string,
    end?: string,
  ): Promise<StationHistoryDto> {
    this.logger.log(
      `Obteniendo histórico id=${stationId} ${start ? `inicio=${start}` : ''} ${end ? `fin=${end}` : ''}`,
    );
    try {
      const { data: raw } = await this.client.get<StationHistoryResponse>(
        `/estaciones/historico/${stationId}`,
        { params: { inicio: start, fin: end } },
      );
      return {
        title: raw.title,
        stationId: raw.estacionId,
        period: { start: raw.periodo.inicio, end: raw.periodo.fin },
        resultCount: raw.cantidadResultados,
        data: raw.data.map((d) => ({
          id: d.id,
          stationId: d.idEstacion,
          timestamp: d.timestamp,
          price: d.price,
        })),
      };
    } catch (err) {
      this.handleAxiosError(err, 'Histórico no encontrado');
    }
  }

  // GET /estaciones/municipio/:idMunicipio
  async getStationsByMunicipality(
    municipalityId: number,
  ): Promise<StationsByMunicipalityDto[]> {
    this.logger.log(`Listando estaciones municipio id=${municipalityId}`);
    try {
      const { data: raw } = await this.client.get<
        StationsByMunicipalityResponse[]
      >(`/estaciones/municipio/${municipalityId}`);
      return raw.map((s) => ({
        stationId: s.idEstacion,
        name: s.nombre,
        address: s.direccion,
        municipalityId: s.idMunicipio,
        latitude: s.latitud,
        longitude: s.longitud,
      }));
    } catch (err) {
      this.handleAxiosError(err);
    }
  }

  // GET /estaciones/radio?latitud&longitud&radio&page&limit
  async getStationsInRadius(
    latitude: number,
    longitude: number,
    radius: number,
    page?: number,
    limit?: number,
  ): Promise<StationInRadiusDto[]> {
    if ([latitude, longitude, radius].some((n) => Number.isNaN(n))) {
      throw new BadRequestException(
        'latitud, longitud y radio deben ser numéricos',
      );
    }
    this.logger.log(
      `Buscando por radio lat=${latitude} lon=${longitude} r=${radius} ${page ? `page=${page}` : ''} ${limit ? `limit=${limit}` : ''}`,
    );
    try {
      const { data: raw } = await this.client.get<StationInRadiusResponse[]>(
        `/estaciones/radio`,
        {
          params: {
            latitud: latitude,
            longitud: longitude,
            radio: radius,
            page,
            limit,
          },
        },
      );
      return raw.map((s) => ({
        id: s._id,
        stationId: s.idEstacion,
        name: s.nombre,
        coordinates: s.coordenadas,
        distance: s.distancia,
        province: s.provincia,
        locality: s.localidad,
      }));
    } catch (err) {
      this.handleAxiosError(err);
    }
  }

  // GET /estaciones/radio/detalles - Nuevo endpoint optimizado
  async getStationsInRadiusWithDetails(
    latitude: number,
    longitude: number,
    radius: number,
    page?: number,
    limit?: number,
  ): Promise<StationDetailsDto[]> {
    const basicStations = await this.getStationsInRadius(
      latitude,
      longitude,
      radius,
      page,
      limit,
    );

    // Filtrar estaciones sin ID y obtener detalles en paralelo
    const stationsWithId = basicStations.filter((s) => s.stationId);
    const detailsPromises = stationsWithId.map((s) =>
      this.getStationDetailsById(s.stationId!).catch((err: unknown) => {
        this.logger.warn(
          `Error obteniendo detalles de estación ${s.stationId}: ${(err as Error).message}`,
        );
        return null;
      }),
    );

    const details = await Promise.all(detailsPromises);
    return details.filter((d): d is StationDetailsDto => d !== null);
  }
}
