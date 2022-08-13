import Client from '../database';

export type Order = {
    id?: number;
    userId: number;
    status: string;
};

export class OrderTable {
    async index(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'select * from orders;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async create(userId: number): Promise<Order> {
        const conn = await Client.connect();
        const sql =
            'Insert into orders(userId, status) ' +
            "values($1, 'acive') returning *";
        const result = await conn.query(sql, [userId]);

        conn.release();

        return result.rows[0];
    }
}
