import 'reflect-metadata';
import { CreateRuralProductorDTO } from "@dtos/rural-productor.dto";
import { RuralProductor } from "@entities/rural-productor.entity";
import { CreateRuralProductorUseCase } from "@useCases/rural-productor/create-rural-productor.use-case";
import { SQLiteRuralProductorRepository } from '@repositories/rural-productor/sqlite-rural-productor.repository';
import { database } from '@env';
import { Farm } from '@entities/farm.entity';
import { SQLiteFarmRepository } from '@repositories/farm/sqlite-farm.repository';
import { CreateFarmUseCase } from '@useCases/farm/create-farm.use-case';

describe('Create rural productor use case', () => {
    let repository: SQLiteRuralProductorRepository;
    let farmRepository: SQLiteFarmRepository;
    let useCase: CreateRuralProductorUseCase;
    let createFarmUseCase: CreateFarmUseCase;
    let farm: Farm;

    beforeAll(async () => {
        await database.connect();

        farm = new Farm({
            name: 'Farm Name',
            city: 'Farm City',
            state: 'Farm State',
            agriculturalArea: 10,
            vegetationArea: 10,
            totalArea: 20,
        });
    });

    beforeEach(() => {
        repository = new SQLiteRuralProductorRepository();
        farmRepository = new SQLiteFarmRepository();
        createFarmUseCase = new CreateFarmUseCase(farmRepository);
        useCase = new CreateRuralProductorUseCase(repository, createFarmUseCase);
    });

    describe('toModelFormat', () => {
        test('should format correctly', async () => {
            const instance = new RuralProductor({
                document: "01648057020",
                name: "Test User",
                farm,
            });

            expect(useCase['toModelFormat'](instance, 1, 1)).toEqual({
                document: "01648057020",
                name: "Test User",
                createdBy: 1,
                farmId: 1,
            });

            const instance_2 = new RuralProductor({
                document: "016.480.570-20",
                name: "Test User 2",
                farm,
            });

            expect(useCase['toModelFormat'](instance_2, 2, 2)).toEqual({
                document: "01648057020",
                name: "Test User 2",
                createdBy: 2,
                farmId: 2,
            });
        });
    });

    describe('toResponseFormat', () => {
        test('should format correctly', async () => {
            const instance = new RuralProductor({
                document: "01648057020",
                name: "Test User",
                farm,
            });

            expect(useCase['toResponseFormat'](instance, 1, 1)).toStrictEqual({
                id: 1,
                document: "016.480.570-20",
                name: "Test User",
                farm: {
                    id: 1,
                    name: 'Farm Name',
                    city: 'Farm City',
                    state: 'Farm State',
                    agriculturalArea: 10,
                    vegetationArea: 10,
                    totalArea: 20,
                }
            });

            const instance_2 = new RuralProductor({
                document: "016.480.570-20",
                name: "Test User 2",
                farm,
            });

            expect(useCase['toResponseFormat'](instance_2, 2, 2)).toStrictEqual({
                id: 2,
                document: "016.480.570-20",
                name: "Test User 2",
                farm: {
                    id: 2,
                    name: "Farm Name",
                    city: "Farm City",
                    state: "Farm State",
                    agriculturalArea: 10,
                    vegetationArea: 10,
                    totalArea: 20
                }
            });
        });
    });

    describe('checkIfExists', () => {
        test('should be called once without errors', async () => {
            expect(await useCase['checkIfExists']("01648057020")).toBeUndefined();
        });
    });

    describe('create', () => {
        test('should create new rural productor with complete data', async () => {
            const newUser: CreateRuralProductorDTO = {
                document: "016.480.570-20",
                name: "Test User",
                farm,
                createdBy: 1,
            };

            const result = await useCase.create(newUser);

            expect(result).toEqual({
                id: 1,
                document: "016.480.570-20",
                name: "Test User",
                farm: {
                    id: 1,
                    name: "Farm Name",
                    city: "Farm City",
                    state: "Farm State",
                    agriculturalArea: 10,
                    vegetationArea: 10,
                    totalArea: 20
                }
            });
        });

        test('should throw an error if rural productor already exists', async () => {
            const newUser: CreateRuralProductorDTO = {
                document: "016.480.570-20",
                name: "Test User",
                createdBy: 1,
                farm,
            };

            expect(async () => {
                await useCase.create(newUser)
            }).rejects.toThrow();
        });

        test('should throw an error if document is invalid', async () => {
            const newUser: CreateRuralProductorDTO = {
                document: "123",
                name: "Test User",
                createdBy: 1,
                farm,
            };

            expect(async () => {
                await useCase.create(newUser)
            }).rejects.toThrow();
        });
    });
});
