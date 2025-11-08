export class StationDetailsDto {
  stationId!: number;
  stationName!: string;
  longitude!: number;
  latitude!: number;
  side!: string; // margen
  postalCode!: string;
  address!: string;
  openingHours!: string;
  saleType!: string; // tipoVenta
  municipalityId!: number;
  lastUpdate!: string; // ISO
  locality!: string;

  Gasoline95?: number;
  Gasoline95_avg?: number;
  Gasoline98?: number;
  Gasoline98_avg?: number;
  Diesel?: number;
  Diesel_avg?: number;
  DieselPremium?: number;
  DieselPremium_avg?: number;
  DieselB_avg?: number;
  LPG_avg?: number; // GLP_media

  province!: string;
  provinceDistrict!: string;
  brand!: string;
}
