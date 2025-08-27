export class PurchaseDto {
  id: number;
  pedidoid: number | string;
  nome: string | null;
  email: string | null;
  cpf: string | null;
  telefone: string | null;
  produto: string | null;
  plan: string | null;
  valororiginal: number | null;
  formapagto: string | null;
  datacadastro: string | null;
  statuspedido: string | null;
  recorrente: boolean;
}
