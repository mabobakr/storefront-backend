import Client from '../database';

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export class ProductTable {
    async index(): Promise<Product[]> {
        const conn = await Client.connect();
        const sql = 'select * from products;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async show(id: number): Promise<Product> {
        const conn = await Client.connect();
        const sql = 'select * from products where id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }

    async create(
        name: string,
        price: number,
        category: string
    ): Promise<Product> {
        const conn = await Client.connect();
        const sql =
            'Insert into products(name, price, category) ' +
            'values($1, $2, $3)';
        const result = await conn.query(sql, [name, price, category]);
        return result.rows[0];
    }
}
