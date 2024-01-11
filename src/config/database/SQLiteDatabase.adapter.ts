import { ModelStatic, Sequelize } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { RuralProductorDB, RuralProductorDBProps } from "./models/sequelize-rural-productor.model";

type Models = 'RuralProductor';

@singleton()
export class SQLiteDatabase {
    private readonly database: Sequelize;
    private readonly models: Record<Models, ModelStatic<any> | null>;

    constructor() {
        this.database = this.createDatabase();
        this.models = {
            RuralProductor: null,
        };
    }

    private createDatabase() {
        this.initModels();

        return new Sequelize({
            dialect: 'sqlite',
            storage: './src/config/database/SQLiteDatabase.sqlite'
        });
    }

    private initModels() {
        const RuralProductor = this.database.define<RuralProductorDB>('RuralProductor', RuralProductorDBProps, { tableName: 'rural_productors', paranoid: true, underscored: true });

        this.models.RuralProductor = RuralProductor;
    }

    connect = async () => {
        await this.database.sync({ force: true });

        await this.database.authenticate().catch(err => {
            logger.error(`SEQUELIZE ERROR ON AUTHENTICATE: ${JSON.stringify(err)}`);

            throw err;
        });
    };

    create(model: Models, params: any) {
        return this.models[model]?.create(params);
    }

    findAll(model: Models) {
        return this.models[model]?.findAll();
    }

    getById(model: Models, id: number) {
        return this.models[model]?.findByPk(id);
    }

    update(model: Models, params: any) {
        throw new Error('Method not implemented.');
    }

    delete(model: Models, id: number) {
        throw new Error('Method not implemented.');
    }
}

