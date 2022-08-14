import Client from '../database';

export type fullOrder = {
    id?: number;
    user_id: number;
    status: string;
    products: [{ quantity: number; id: number }];
};

export class OrderProductTable {
    async showOrders(user_id: number) {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT order_id, product_id, quantity, user_id, status from orders_products ' +
                'inner join orders on orders.id = order_id where user_id=$1';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("Couldn't get orders");
        }
    }

    async addProduct(prod_id: number, order_id: number, quantity: number) {
        try {
            const conn = await Client.connect();
            const sql =
                'insert into orders_products(product_id, order_id, quantity) ' +
                'values($1, $2, $3) returning *';
            const result = await conn.query(sql, [prod_id, order_id, quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error("Couldn't add product");
        }
    }

    async delete() {
        try {
            const conn = await Client.connect();
            const sql = 'delete from orders_products;';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            throw new Error("Couldn't delete relation");
        }
    }
}
