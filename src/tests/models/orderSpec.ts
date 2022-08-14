import { OrderTable } from '../../models/order';
import { UserTable } from '../../models/user';

const table = new OrderTable();
const userTable = new UserTable();

describe('Order Model', () => {
    it("it should Fail because user doesn't exist", async () => {
        await expectAsync(table.create(1)).toBeRejected();
    });

    it('Should return a list of orders', async () => {
        const res = await table.index();
        expect(res).toEqual([]);
    });
});
