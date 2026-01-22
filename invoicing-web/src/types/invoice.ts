export interface Invoice {
  id: number;
  dateTime: string;
  totalAmount: number;
  paymentStatus: string;
}

export interface CreateInvoiceDTO {
  totalAmount: number;
}
