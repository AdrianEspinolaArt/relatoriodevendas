export class PlanDto {
  id: string;
  name: string;
  description: string | null;
  created_at?: Date;
  updated_at?: Date;
  expires_at?: Date;
  payment_due_date?: Date;
  billingInfo?: any;
  client_data?: any;
}
