import { singleton } from "tsyringe";
import { Database, Models } from "@interfaces/database.interface";

@singleton()
export class InMemoryDatabase implements Database {
    private readonly database;

    constructor() {
        this.database = {
            RuralProducer: [],
            Farm: [],
        };
    }

    connect = () => {
        return true;
    };

    authenticate = () => {
        return true;
    }

    private getLastId = (model: Models) => {
        const lastIndex = this.database[model].length - 1;

        if (lastIndex < 0) return 1;

        const { id } = this.database[model][lastIndex];

        return id + 1;
    }

    create(model: Models, params: any): any {
        const obj = { ...params, id: this.getLastId(model) };

        this.database[model].push(obj);

        return obj;
    }

    findAll(model: Models, options: any) {
        throw new Error('Method not implemented.');
    }

    findOne(model: Models, filter: any) {
        const [key] = Object.keys(filter.where);

        return this.database[model].find(item => item[key] == filter.where[key]);
    }

    findById(model: Models, id: any) {
        return this.database[model][id];
    }

    getById(model: Models, id: number) {
        return this.database[model][id];
    }

    update(model: Models, params: any) {
        throw new Error('Method not implemented.');
    }

    delete(model: Models, _: any, filter: any) {
        const id = filter?.where?.id;

        const index = this.findIndexByProperty(this.database[model], 'id', id);

        if (index >= 0 && index < this.database[model].length) {
            this.database[model].splice(index, 1);
        }
    }

    private findIndexByProperty(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }

        return -1;
    }
}

