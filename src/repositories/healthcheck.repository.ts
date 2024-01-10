import { database } from '@database';
import { injectable } from "tsyringe";

@injectable()
export class HealthCheckRepository {
    constructor() {
    }

    checkDatabase = async () => {
        await database.postgreSQL.authenticate();

        return true;
    }
}
