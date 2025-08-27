export class PlanDto {
  id: number;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  expires_at?: Date;
  payment_due_date?: Date;
  billingInfo?: any;
  client_data?: any;
}
