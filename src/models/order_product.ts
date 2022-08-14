import Client from '../database';

export type fullOrder = {
    id?: number;
    userId: number;
    status: string;
    products: [{ quantity: number; id: number }];
};

export class OrderProductTable {
    async showOrders(userId: number) {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT orderId, productId, quantity, userId, status from orders_products ' +
                'inner join orders on orders.id = orderId where userId=$1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("Couldn't get orders");
        }
    }

    async addProduct(prodId: number, orderId: number, quantity: number) {
        try {
            const conn = await Client.connect();
            const sql =
                'insert into orders_products(productId, orderId, quantity) ' +
                'values($1, $2, $3) returning *';
            const result = await conn.query(sql, [prodId, orderId, quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error("Couldn't add product");
        }
    }
}
