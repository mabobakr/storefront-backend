import Client from '../database';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserTable {
    async index(): Promise<User[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }

    async show(id: number): Promise<User> {
        const conn = await Client.connect();
        const sql = 'select * from users where id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }

    async create(user: User): Promise<User> {
        const conn = await Client.connect();
        const sql =
            'INSERT INTO users(firstName, lastName, password) ' +
            'values($1, $2, $3) returning id, firstName, lastName';

        const result = await conn.query(sql, [
            user.firstName,
            user.lastName,
            user.password,
        ]);

        conn.release();
        return result.rows[0];
    }
}
