import { Product } from '../entity/Product';
import { AppDataSource } from '../dataSource';

const productRepository = AppDataSource.getRepository(Product);

const findOne = async (query: Object) => {
    return await productRepository.findOneBy(query);
};

const findAll = async () => {
    return await productRepository.find();
};

const create = async (input: Partial<Product>) => {
    return await productRepository.save(productRepository.create(input));
};

const update = async (id: string, product: Partial<Product>) => {
    await productRepository.update(id, product);
    return await productRepository.findOne({ where: { id: Number(id) } });
};

const remove = async (id: string) => {
    const product = await productRepository.findOne({ where: { id: Number(id) } });
    if (!product) {
        throw new Error(`product with id ${id} not found`);
    }
    await productRepository.remove(product);
    return product;
};

export const ProductService = {
    findOne,
    findAll,
    create,
    update,
    remove,
};
