import { TodosRepositoryInMemory } from './TodosRepositoryInMemory';

// Create a single todosRepository as the data is all in memory 8)
const todosRepository = new TodosRepositoryInMemory();

export default class TodosRepositoryFactory {
    static build(): TodosRepositoryInMemory {
        return todosRepository;
    }
}
