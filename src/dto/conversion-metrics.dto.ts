export class ConversionMetricsDto {
  users: {
    total: number;
    uniqueCustomers: number;
    conversionRate: number;
  };
  orders: {
    total: number;
    payments: number;
    value: {
      ordered: number;
      paid: number;
    };
  };
}
