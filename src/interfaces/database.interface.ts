export type Models = 'RuralProductor';

export interface Database {
    connect();
    authenticate();
    create(model: Models, params: any): Promise<any>
    findAll(model: Models, options: any)
    findOne(model: Models, options: any)
    findById(model: Models, id: any)
    getById(model: Models, id: number)
    update(model: Models, params: any)
    delete(model: Models, newValues: any, filter: any)
}
