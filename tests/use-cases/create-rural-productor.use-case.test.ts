import 'reflect-metadata';
import { CreateRuralProductorModelDTO } from "@dtos/rural-productor.dto";
import { RuralProductor } from "@entities/rural-productor.entity";
import { CreateRuralProductorUseCase } from "@useCases/rural-productor/create-rural-productor.use-case";
import { SQLiteRuralProductorRepository } from '@repositories/rural-productor/inmemory-rural-productor.repository';
import { database } from '@env';

describe('Create rural productor use case', () => {
    let repository: SQLiteRuralProductorRepository;
    let useCase: CreateRuralProductorUseCase;

    beforeAll(async () => {
        await database.connect();
    });

    beforeEach(() => {
        repository = new SQLiteRuralProductorRepository();
        useCase = new CreateRuralProductorUseCase(repository);
    });

    describe('toModelFormat', () => {
        test('should format correctly', async () => {
            const instance = new RuralProductor({
                document: "01648057020",
                name: "Test User",
            });

            expect(useCase['toModelFormat'](instance, 1)).toStrictEqual({
                document: "01648057020",
                name: "Test User",
                createdBy: 1,
            });

            const instance_2 = new RuralProductor({
                document: "016.480.570-20",
                name: "Test User 2",
            });

            expect(useCase['toModelFormat'](instance_2, 2)).toStrictEqual({
                document: "01648057020",
                name: "Test User 2",
                createdBy: 2,
            });
        });
    });

    describe('toResponseFormat', () => {
        test('should format correctly', async () => {
            const instance = new RuralProductor({
                document: "01648057020",
                name: "Test User",
            });

            expect(useCase['toResponseFormat'](instance, 1)).toStrictEqual({
                id: 1,
                document: "016.480.570-20",
                name: "Test User",
            });

            const instance_2 = new RuralProductor({
                document: "016.480.570-20",
                name: "Test User 2",
            });

            expect(useCase['toResponseFormat'](instance_2, 2)).toStrictEqual({
                id: 2,
                document: "016.480.570-20",
                name: "Test User 2",
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
            const newUser: CreateRuralProductorModelDTO = {
                document: "016.480.570-20",
                name: "Test User",
                createdBy: 1,
            };

            const result = await useCase.create(newUser);

            expect(result).toEqual({
                id: 1,
                document: "016.480.570-20",
                name: "Test User",
            });
        });

        test('should throw an error if rural productor already exists', async () => {
            const newUser: CreateRuralProductorModelDTO = {
                document: "016.480.570-20",
                name: "Test User",
                createdBy: 1,
            };

            expect(async () => {
                await useCase.create(newUser)
            }).rejects.toThrow();
        });

        test('should throw an error if document is invalid', async () => {
            const newUser: CreateRuralProductorModelDTO = {
                document: "123",
                name: "Test User",
                createdBy: 1,
            };

            expect(async () => {
                await useCase.create(newUser)
            }).rejects.toThrow();
        });
    });
});
