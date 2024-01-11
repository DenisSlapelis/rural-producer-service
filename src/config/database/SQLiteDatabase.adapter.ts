import { ModelStatic, Sequelize } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { RuralProductorDB, RuralProductorDBProps } from "./models/sequelize-rural-productor.model";

type Models = 'RuralProductor';

@singleton()
export class SQLiteDatabase {
    private database: Sequelize;
    private readonly models: Record<Models, ModelStatic<any> | null>;

    constructor() {
        this.database = new Sequelize({
            dialect: 'sqlite',
            storage: './src/config/database/rural_producer_db.sqlite'
        });
        this.models = {
            RuralProductor: null,
        };
    }

    private initModels() {
        const RuralProductor = this.database.define<RuralProductorDB>('RuralProductor', RuralProductorDBProps, { tableName: 'rural_productors', paranoid: true, underscored: true });

        this.models.RuralProductor = RuralProductor;
    }

    connect = async () => {
        this.initModels();

        await this.database.sync({ force: true });

        await this.authenticate();
    };

    authenticate = async () => {
        await this.database.authenticate().catch(err => {
            logger.error(`SEQUELIZE ERROR ON AUTHENTICATE: ${JSON.stringify(err)}`);

            throw err;
        });
    }

    async create(model: Models, params: any): Promise<any> {
        const result = await this.models[model]?.create(params);

        return result?.dataValues;
    }

    async findAll(model: Models, options: any) {
        const result = await this.models[model]?.findAll(options);

        return result;
    }

    async findOne(model: Models, options: any) {
        const result = await this.models[model]?.findOne(options);

        return result?.dataValues;
    }

    async findById(model: Models, id: any) {
        const result = await this.models[model]?.findByPk(id);

        return result?.dataValues;
    }

    async getById(model: Models, id: number) {
        return this.models[model]?.findByPk(id);
    }

    async update(model: Models, params: any) {
        throw new Error('Method not implemented.');
    }

    async delete(model: Models, id: number) {
        throw new Error('Method not implemented.');
    }
}

