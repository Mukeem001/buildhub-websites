export interface Order {
  id: number;

  orderId: string;

  customerName: string;

  customerEmail: string;

  templateName: string;

  amount: number;

  paymentMethod: "Stripe" | "PayPal" | "Razorpay";

  paymentStatus: "Paid" | "Pending" | "Failed";

  orderStatus: "Completed" | "Processing" | "Cancelled";

  createdAt: string;

  updatedAt: string;

  country: string;

  avatar: string;
}