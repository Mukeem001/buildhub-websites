export interface Order {
  id: number;
  status: string;
}

/**
 * Delete Selected Orders
 */
export const deleteSelectedOrders = <T extends Order>(
  selectedIds: number[],
  orders: T[]
): T[] => {
  return orders.filter(
    (order) => !selectedIds.includes(order.id)
  );
};

/**
 * Mark Selected Orders as Completed
 */
export const completeSelectedOrders = <T extends Order>(
  selectedIds: number[],
  orders: T[]
): T[] => {
  return orders.map((order) =>
    selectedIds.includes(order.id)
      ? {
          ...order,
          status: "Completed",
        }
      : order
  );
};