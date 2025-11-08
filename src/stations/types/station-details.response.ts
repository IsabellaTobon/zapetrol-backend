export interface StationDetailsResponse {
  idEstacion: number;
  nombreEstacion: string;
  longitud: string;
  latitud: string;
  margen: string;
  codPostal: string;
  direccion: string;
  horario: string;
  tipoVenta: string;
  idMunicipio: number;
  lastUpdate: string;
  localidad: string;
  Gasolina95?: string;
  Gasolina95_media?: string;
  Gasolina98?: string;
  Gasolina98_media?: string;
  Diesel?: string;
  Diesel_media?: string;
  DieselPremium?: string;
  DieselPremium_media?: string;
  DieselB_media?: string;
  GLP_media?: string;
  provincia: string;
  provinciaDistrito: string;
  marca: string;
}
