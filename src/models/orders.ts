import Client from '../database';

export type Order = {
    id: number;
    userId: number;
    status: string;
};

export class OrderTable {
    async showOrders(userId: number) {
        const conn = await Client.connect();
        const sql = 'SELECT * from orders where userId=$1';
        const result = await conn.query(sql, [userId]);
        conn.release();
        return result.rows[0];
    }
}
