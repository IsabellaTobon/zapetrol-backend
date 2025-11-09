export interface StationInRadiusResponse {
  _id: string;
  nombre: string;
  coordenadas: { type: string; coordinates: number[] };
  distancia: number;
  provincia: string;
  localidad: string;
}
