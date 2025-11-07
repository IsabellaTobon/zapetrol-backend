export interface StationRaw {
  IDEstacion: string;
  Rótulo: string; // Marca de la estación (Repsol, Cepsa, etc.)

  // Ubicación geográfica
  Latitud: string;
  Longitud: string;
  Provincia: string;
  Localidad: string;
  Municipio: string;
  'Código postal': string;
  Dirección: string;

  // Precios de combustibles
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 98 E5': string;
  'Precio Gasóleo A': string; // Diesel

  // Horario de la estación
  Horario: string;

  // Margen (información adicional de precios)
  Margen: string;

  // Fecha de actualización de precios
  'Fecha actualización': string;
}
