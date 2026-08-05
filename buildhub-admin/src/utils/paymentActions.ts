import { Payment } from "@/features/payments/types/payment";

/**
 * Delete Selected Payments
 */
export const deleteSelectedPayments = (
  selectedIds: number[],
  payments: Payment[]
): Payment[] => {
  return payments.filter(
    (payment) => !selectedIds.includes(payment.id)
  );
};

/**
 * Refund Selected Payments
 */
export const refundSelectedPayments = (
  selectedIds: number[],
  payments: Payment[]
): Payment[] => {
  return payments.map((payment) =>
    selectedIds.includes(payment.id)
      ? {
          ...payment,
          status: "Refunded",
        }
      : payment
  );
};