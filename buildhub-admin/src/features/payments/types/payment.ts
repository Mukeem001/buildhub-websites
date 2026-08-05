export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed"
  | "Refunded";

export type PaymentMethod =
  | "Credit Card"
  | "Debit Card"
  | "UPI"
  | "PayPal"
  | "Stripe"
  | "Razorpay";

export interface Payment {
  id: number;

  customer: string;

  email: string;

  orderId: string;

  amount: number;

  method: PaymentMethod;

  status: PaymentStatus;

  transactionId: string;

  createdAt: string;
}