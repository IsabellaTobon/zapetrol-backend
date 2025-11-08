export interface StationRaw {
  // Identificación
  idEstacion: number;
  nombreEstacion: string;
  marca: string;

  // Ubicación geográfica
  latitud: string;
  longitud: string;
  provincia: string;
  provinciaDistrito: string;
  localidad: string;
  municipio?: string;
  idMunicipio: number;
  codPostal: string;
  direccion: string;

  // Precios de combustibles - Gasolina
  Gasolina95: string;
  Gasolina95_media: string;
  Gasolina98: string;
  Gasolina98_media: string;

  // Precios de combustibles - Diesel
  Diesel: string;
  Diesel_media: string;

  // Información adicional
  horario: string;
  lastUpdate: string;
}
