import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capEchoResult
        } from '@capacitor-community/sqlite';

export class SQLiteServices {
    sqlite: SQLiteConnection | undefined;
    isService:  boolean = false;
    platform: string = Capacitor.getPlatform();
    sqlitePlugin: any;
    native: boolean = false;

    constructor() {}

    initializePlugin(): Promise<boolean> {
        return new Promise(
            resolve => {
                if (this.platform === 'ios' || this.platform === 'android')
                    this.native = true;
                this.sqlitePlugin = CapacitorSQLite;
                this.sqlite = new SQLiteConnection(this.sqlitePlugin);
                this.isService = true;
                resolve(true);
            });
    }

    async echo(value: string): Promise<capEchoResult> {
        if (this.sqlite != null) {
            try {
                const ret = await this.sqlite.echo(value);
                return Promise.resolve(ret);
            } catch (err) {
                return Promise.reject(new Error('error en echo: ' + err));
            }
        } else {
            return Promise.reject(new Error('no connection open'));
        }
    }

    async createNCConnection(
        databasePath: string,
        version: number,
      ): Promise<SQLiteDBConnection> {
        if (this.sqlite != null) {
          try {
            const db: SQLiteDBConnection = await this.sqlite.createNCConnection(
              databasePath,
              version,
            );
            if (db != null) {
              return Promise.resolve(db);
            } else {
              return Promise.reject(new Error(`no db returned is null`));
            }
          } catch (err) {
            return Promise.reject(new Error('error en createNCConnection: ' + err));
          }
        } else {
          return Promise.reject(
            new Error(`no connection open for ${databasePath}`),
          );
        }
    }

    async closeNCConnection(databasePath: string): Promise<void> {
        if (this.sqlite != null) {
          try {
            await this.sqlite.closeNCConnection(databasePath);
            return Promise.resolve();
          } catch (err) {
            return Promise.reject(new Error('error en closeNCConnection: ' + err));
          }
        } else {
          return Promise.reject(
            new Error(`no connection open for ${databasePath}`),
          );
        }
    }

    async createConnection(
    database: string,
    encrypted: boolean,
    mode: string,
    version: number,
    ): Promise<SQLiteDBConnection> {
        if (this.sqlite != null) {
            try {
            const db: SQLiteDBConnection = await this.sqlite.createConnection(
                database,
                encrypted,
                mode,
                version,
            );
            if (db != null) {
                return Promise.resolve(db);
            } else {
                return Promise.reject(new Error(`no db returned is null`));
            }
            } catch (err) {
            return Promise.reject(new Error('error en createConnection: ' + err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    async closeConnection(database: string): Promise<void> {
        if (this.sqlite != null) {
          try {
            await this.sqlite.closeConnection(database);
            return Promise.resolve();
          } catch (err) {
            return Promise.reject(new Error('error en closeConnection: ' + err));
          }
        } else {
          return Promise.reject(new Error(`no connection open for ${database}`));
        }
      }
}

