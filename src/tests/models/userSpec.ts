import { UserTable } from '../../models/user';

const table = new UserTable();

describe('user Model', () => {
    it('it should create an object', async () => {
        const user = {
            first_name: 'first name',
            last_name: 'last name',
            password: 'password',
        };
        const res = await table.create(user);
        expect(res).toEqual({
            id: 1,
            first_name: 'first name',
            last_name: 'last name',
        });
    });

    it('Should show the correct object', async () => {
        const res = await table.show(1);
        expect(res).toEqual({
            id: 1,
            first_name: 'first name',
            last_name: 'last name',
        });
    });

    it('Should return a list of users', async () => {
        const res = await table.index();
        expect(res).toEqual([
            {
                id: 1,
                first_name: 'first name',
                last_name: 'last name',
            },
        ]);
    });
});
