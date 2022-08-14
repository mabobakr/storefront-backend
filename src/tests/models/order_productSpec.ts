import { OrderProductTable } from "../../models/order_product";


const table = new OrderProductTable();

describe("Order_product model", () => {
  it("Should have a definition for addProduct", () => {
    expect(table.addProduct).toBeDefined()
  })
  it("Should have a definition for showOrders", () => {
    expect(table.showOrders).toBeDefined()
  })
})