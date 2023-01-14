import path from 'path';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();
const dbFolder = path.resolve(process.cwd(), './db');
const dbFile = path.join(dbFolder, 'todos.db');

export class DBConnection {
    connection: sqlite3.Database | null = null;

    private _connect() {
        if (this.connection) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const connection = new sqlite.Database(dbFile, (err) => {
                if (err) {
                    console.error('Error while connecting to the database.');
                    return reject(err);
                }

                console.log('Connected to the database successfully');
                this.connection = connection;
                resolve({});
            });
        });

    }

    async query(query: string, params: any = []) {
        await this._connect();
        return new Promise<any[]>((resolve, reject) => {
            // Since SQLite doesn't have the type boolean, we set the field 'done' as INTEGER
            this.connection?.all(query, params, (err: Error | null, rows: any[]) => {
                if (err) {
                    return reject(err);
                }

                return resolve(rows);
            });

        });
    }

    async run(query: string, params: any = {}) {
        await this._connect();
        return new Promise<{}>((resolve, reject) => {
            // Since SQLite doesn't have the type boolean, we set the field 'done' as INTEGER
            this.connection?.run(query, params, (_: sqlite3.RunResult, err: Error | null) => {
                if (err) {
                    console.error(`Error wile running a db command: ${err}`);
                    return reject(err);
                }
                return resolve({});
            });
        });
    }
}
