export interface StationInRadiusDto {
  id: string;
  name: string;
  coordinates: { type: string; coordinates: number[] }; // GeoJSON
  distance: number;
  province: string;
  locality: string;
}
