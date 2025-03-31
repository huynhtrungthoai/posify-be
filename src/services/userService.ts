import { AppDataSource } from '../dataSource';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

const create = async (input: Partial<User>) => {
    return await userRepository.save(userRepository.create(input));
};

const update = async (id: string, store: Partial<User>) => {
    await userRepository.update(id, store);
    return await userRepository.findOne({ where: { id: Number(id) } });
};

const findOne = async (query: Object) => {
    return await userRepository.findOneBy(query);
};

const findAll = async () => {
    return await userRepository.find();
};

export const UserService = {
    create,
    update,
    findOne,
    findAll,
};
