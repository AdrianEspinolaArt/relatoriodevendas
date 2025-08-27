export class PurchaseDto {
  id: string;
  pedidoid: string | null;
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
