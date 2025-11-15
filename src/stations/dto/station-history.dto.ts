export interface StationHistoryItemDto {
  id: number;
  stationId: number;
  timestamp: string; // ISO
  price: number;
}
export interface StationHistoryDto {
  title: string;
  stationId: number;
  period: { start: string; end: string };
  resultCount: number;
  data: StationHistoryItemDto[];
}
