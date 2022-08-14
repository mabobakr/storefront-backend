import Client from '../database';

export type Order = {
    id?: number;
    user_id: number;
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

    async create(user_id: number): Promise<Order> {
        const conn = await Client.connect();
        const sql =
            'Insert into orders(user_id, status) ' +
            "values($1, 'acive') returning *";
        const result = await conn.query(sql, [user_id]);

        conn.release();

        return result.rows[0];
    }
}
