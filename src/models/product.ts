import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductTable {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("Couldn't get products");
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error("Couldn't get the product");
        }
    }

    async create(prod: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql =
                'Insert into products(name, price, category) ' +
                'values($1, $2, $3) returning *';
            const result = await conn.query(sql, [
                prod.name,
                prod.price,
                prod.category,
            ]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error("Couldn't create product");
        }
    }

    async delete() {
        try {
            const conn = await Client.connect();
            const sql = 'delete from products;';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            throw new Error("Couldn't delete products");
        }
    }
}
