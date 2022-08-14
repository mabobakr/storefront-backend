import Client from '../database';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password?: string;
};

export class UserTable {
    async index(): Promise<User[]> {
        const conn = await Client.connect();
        const sql = 'SELECT id, first_name, last_name FROM users;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async show(id: number): Promise<User> {
        const conn = await Client.connect();
        const sql = 'select id, first_name, last_name from users where id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }

    async create(user: User): Promise<User> {
        const conn = await Client.connect();
        const sql =
            'INSERT INTO users(first_name, last_name, password) ' +
            'values($1, $2, $3) returning id, first_name, last_name';

        const result = await conn.query(sql, [
            user.first_name,
            user.last_name,
            user.password,
        ]);

        conn.release();
        return result.rows[0];
    }
}
