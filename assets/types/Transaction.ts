export interface Transaction {
    id: string;
    text: string;
    amount: number;
    paymentType:string;
    transactionType:string;
    userId: string;
    createdAt: Date;
  }