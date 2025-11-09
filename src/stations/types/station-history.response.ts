export interface StationHistoryItemResponse {
  id: number;
  idEstacion: number;
  timestamp: string;
  price: number;
}
export interface StationHistoryResponse {
  title: string;
  estacionId: number;
  periodo: { inicio: string; fin: string };
  cantidadResultados: number;
  data: StationHistoryItemResponse[];
}
