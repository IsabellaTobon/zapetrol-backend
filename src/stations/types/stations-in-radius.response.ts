export interface StationInRadiusResponse {
  _id: string;
  idEstacion?: number; // Puede que exista o no en la respuesta
  nombre: string;
  coordenadas: { type: string; coordinates: number[] };
  distancia: number;
  provincia: string;
  localidad: string;
}
