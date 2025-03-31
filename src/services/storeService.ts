import { AppDataSource } from '../dataSource';
import { Store } from '../entity/Store';

const storeRepository = AppDataSource.getRepository(Store);

export const createStore = async (input: Partial<Store>) => {
    return await storeRepository.save(storeRepository.create(input));
};

export const findStore = async (query: Object) => {
    return await storeRepository.findOneBy(query);
};

export const findAllStore = async () => {
    return await storeRepository.find();
};
