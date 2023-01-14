import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const dbFolder = path.resolve(__dirname, '../db');
const dbFile = path.join(dbFolder, 'todos.db');

const createDatabase = () => {
    if (fs.existsSync(dbFolder)) {
        console.log('Previous DB was found. Deleting...');
        fs.rmSync(dbFolder, { recursive: true });
    }

    fs.mkdirSync(dbFolder);
    fs.writeFileSync(dbFile, '');
    console.log('Database successfully created.');
};

const getConnection = (): Promise<sqlite3.Database> => new Promise((resolve) => {
    const connection = new sqlite.Database(dbFile, (err) => {
        if (err) {
            console.error(`Unable to open database: ${err}`);
            process.exit(1);
        }

        console.log('Connected to the database.');
        resolve(connection);
    });
});

function createTables(connection: sqlite3.Database) {
    const query = 'CREATE TABLE todos (id INTEGER, userId INTEGER, title TEXT, description TEXT, done INTEGER)'
    return new Promise((resolve, reject) => {
        // Since SQLite doesn't have the type boolean, we set the field 'done' as INTEGER
        connection
            .run(query, (context: sqlite3.RunResult, err: Error | null) => {
                if (err) return reject(err);
                console.log('Tables created successfully');
                return resolve({});
            });

    });
};

// async function insertUsers({ users }) {
//     const db = await getInstance({ dbFile });

//     for (let user of users) {
//         db.run('INSERT INTO users VALUES ($id, $name, $email)', {
//             $id: user.id,
//             $name: user.name,
//             $email: user.email
//         }, () => {
//             db.all('SELECT * FROM users', (_, rows) => console.log('Inserted users: ', rows.length));
//         });
//     }
// };

async function insertTodos(connection: sqlite3.Database) {
    const todos = [
        { id: 1, userId: 1, title: 'Study Next.js', description: 'Watch section 3', done: 1 },
        { id: 2, userId: 1, title: 'Study Node.js', description: 'Watch advanced event loop module', done: 0 },
        { id: 3, userId: 1, title: 'Study Postgres', description: 'Start learning the basics', done: 0 },
        { id: 4, userId: 2, title: 'Do the dishes', description: 'Watching One Piece', done: 1 },
        { id: 5, userId: 2, title: 'Groceries', description: 'Tomato sauce, pasta, garlic, wine', done: 0 },
        { id: 6, userId: 3, title: 'Review Fulano\'s PR', description: 'PR link http://their-awesome-pr.com', done: 1 },
        { id: 7, userId: 3, title: 'Go to the gym', description: 'Train B', done: 0 },
        { id: 8, userId: 3, title: 'Study Postgres', description: 'Start the indexes module', done: 0 },
        { id: 9, userId: 3, title: 'Study React', description: 'Continue the react hooks module', done: 0 }
    ];

    for (const todo of todos) {
        connection.run('INSERT INTO todos VALUES ($id, $userId, $title, $description, $done)', {
            $id: todo.id,
            $userId: todo.userId,
            $title: todo.title,
            $description: todo.description,
            $done: todo.done,
        }, () => {
            connection.all('SELECT * FROM todos', (_, rows) => console.log('Inserted todos: ', rows.length));
        });
    }
};

async function setupDb() {
    await createDatabase();
    const connection = await getConnection();
    await createTables(connection);
    await insertTodos(connection)
}

setupDb();
