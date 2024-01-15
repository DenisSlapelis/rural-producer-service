import { ModelStatic, Sequelize } from "sequelize";
import { singleton } from "tsyringe";
import * as logger from '@logger';
import { RuralProducerDB, RuralProducerDBProps } from "./models/sequelize-rural-producer.model";
import { Database, Models } from "@interfaces/database.interface";
import { FarmDB, FarmDBProps } from "./models/sequelize-farm.model";
import { CropDB, CropDBProps } from "./models/sequelize-crop.model";
import { FarmCropDB, FarmCropDBProps } from "./models/sequelize-farm-crop.model";

@singleton()
export class SQLiteDatabaseHelper implements Database {
    private database: Sequelize;
    private readonly models: Record<Models, ModelStatic<any> | null>;

    constructor() {
        this.database = new Sequelize({
            dialect: 'sqlite',
            storage: './src/config/database/rural_producer_db.sqlite',
            logging: console.log,
        });
        this.models = {
            RuralProducer: null,
            Farm: null,
            Crop: null,
            FarmCrop: null,
        };
    }

    private initModels() {
        const RuralProducer = this.database.define<RuralProducerDB>('RuralProducer', RuralProducerDBProps, { tableName: 'rural_producers', paranoid: true, underscored: true });
        const Farm = this.database.define<FarmDB>('Farm', FarmDBProps, { tableName: 'farms', paranoid: true, underscored: true });
        const Crop = this.database.define<CropDB>('Crop', CropDBProps, { tableName: 'crops', paranoid: true, underscored: true });
        const FarmCrop = this.database.define<FarmCropDB>('FarmCrop', FarmCropDBProps, { tableName: 'farm_crops', paranoid: true, underscored: true });

        this.models.RuralProducer = RuralProducer;
        this.models.Farm = Farm;
        this.models.Crop = Crop;
        this.models.FarmCrop = FarmCrop;
    }

    connect = async () => {
        this.initModels();

        await this.database.sync();

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
        const results = await this.models[model]?.findAll(options);

        return results?.map(result => result.dataValues) || [];
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

    async delete(model: Models, newValues: any, filter: any) {
        return this.models[model]?.update({
            deletedAt: new Date(),
        }, {
            where: { ...filter },
        });
    }
}

