import { DBConnection } from './DBConnection';
import { TodosRepositoryDB } from './TodosRepositoryDB';

export default class TodosRepositoryFactory {
    static build(): TodosRepositoryDB {
        const dbConnection = new DBConnection();
        const todosRepository = new TodosRepositoryDB(dbConnection);
        return todosRepository;
    }
}
