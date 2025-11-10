export interface StationInRadiusDto {
  id: string;
  stationId?: number;
  name: string;
  coordinates: { type: string; coordinates: number[] }; // GeoJSON
  distance: number;
  province: string;
  locality: string;
}
