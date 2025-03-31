import { AppDataSource } from '../dataSource';
import { Store } from '../entity/Store';

const storeRepository = AppDataSource.getRepository(Store);

const findOne = async (query: Object) => {
    return await storeRepository.findOneBy(query);
};

const findAll = async () => {
    return await storeRepository.find();
};

const create = async (input: Partial<Store>) => {
    return await storeRepository.save(storeRepository.create(input));
};

const update = async (id: string, store: Partial<Store>) => {
    await storeRepository.update(id, store);
    return await storeRepository.findOne({ where: { id: Number(id) } });
};

const remove = async (id: string) => {
    const store = await storeRepository.findOne({ where: { id: Number(id) } });
    if (!store) {
        throw new Error(`Store with id ${id} not found`);
    }
    await storeRepository.remove(store);
    return store;
};

export const StoreService = {
    findOne,
    findAll,
    create,
    update,
    remove,
};
