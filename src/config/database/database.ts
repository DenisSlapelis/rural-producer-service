import { DatabaseParamsDTO, DatabaseQueryOptionsDTO } from "src/dtos/database.dto";
import { Sequelize } from "sequelize";
import { Transaction, QueryOptions, QueryTypes } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { env } from "@env";

@singleton()
export class Database {
    postgreSQL: Sequelize;
    models;

    constructor() {
        this.postgreSQL = new Sequelize({
            dialect: 'sqlite',
            storage: './src/config/database/database.sqlite'
        });
        this.models = {};
    }

    connect = async (params: DatabaseParamsDTO) => {
        const { host, databaseName, user, password } = params;

        if (env.getValue('APPLICATION_ENVIRONMENT') == 'test') return this.setupLocalDatabase();

        if (!host || !databaseName || !user || !password)
            throw `Invalid database configs: host: ${host} | databaseName: ${databaseName} | user: ${user} | password: ${password}`;

        const connectionStringUrl = `postgres://${user}:${password}@${host}:5432/${databaseName}`;

        const sequelize = new Sequelize(connectionStringUrl);

        this.postgreSQL = sequelize;

        await this.postgreSQL.authenticate().catch(err => {
            logger.error(`SEQUELIZE ERROR ON AUTHENTICATE: ${JSON.stringify(err)}`);

            throw err;
        });
    };

    private async setupLocalDatabase() {
        await this.postgreSQL.sync({ force: true });
    }

    getTransaction = async () => {
        try {
            return this.postgreSQL.transaction();
        } catch (err) {
            logger.error('Erro ao pegar transação:', err);
            throw err;
        }
    };

    execute = async (sql: string, queryOptions: DatabaseQueryOptionsDTO) => {
        const { transaction, queryType, replacements, logging } = queryOptions;

        try {
            const options: QueryOptions = {
                type: QueryTypes[queryType],
            };

            if (transaction) options.transaction = transaction;
            if (replacements) options.replacements = replacements;
            if (logging) options.logging = logging;

            const result = await this.postgreSQL.query(sql, options);

            return result as any[];
        } catch (err) {
            logger.error(`Error executing query: ${err}`);

            if (transaction) transaction.rollback();

            throw err;
        }
    };

    commit = async (transaction: Transaction) => {
        if (!transaction) throw 'Invalid transaction';

        await transaction.commit().catch((err) => {
            logger.error(`Error executing commit: ${err}`);

            throw err;
        });
    };

    rollback = async (transaction: Transaction) => {
        if (!transaction) throw 'Invalid transaction';

        await transaction.rollback().catch((err) => {
            logger.error(`Error executing rollback: ${err}`);

            throw err;
        });
    };
}

