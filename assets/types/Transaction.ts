export interface Transaction {
    id: string;
    text: string;
    amount: number;
    paymentType:string;
    userId: string;
    createdAt: Date;
  }