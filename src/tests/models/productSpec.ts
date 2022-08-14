import { ProductTable } from '../../models/product';

const table = new ProductTable();

describe('Product Model', () => {
    afterAll(async () => {
        await table.delete();
    });
    it('it should create an object', async () => {
        const prod = {
            name: 'product name',
            price: 3,
            category: 'product category',
        };
        const res = await table.create(prod);
        expect(res).toEqual({
            id: 2,
            name: 'product name',
            price: 3,
            category: 'product category',
        });
    });

    it('Should show the correct object', async () => {
        const res = await table.show(2);
        expect(res).toEqual({
            id: 2,
            name: 'product name',
            price: 3,
            category: 'product category',
        });
    });

    it('Should return a list of products', async () => {
        const res = await table.index();
        expect(res).toEqual([
            {
                id: 2,
                name: 'product name',
                price: 3,
                category: 'product category',
            },
        ]);
    });
});
