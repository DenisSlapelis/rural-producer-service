import { Crop } from "@entities/crop.entity";
import { InMemoryCropRepository } from "@repositories/crop/inmemory-crop.repository";
import { InMemoryFarmRepository } from "@repositories/farm/inmemory-farm.repository";
import { InMemoryDashboardRepository } from "@repositories/report/InMemoryDashboard.repository";
import { CreateFarmCropUseCase } from "@useCases/farm/create-farm-crop.use-case";
import { CreateFarmUseCase } from "@useCases/farm/create-farm.use-case";
import { GetDashboardUseCase } from "@useCases/reports/get-dashboard.use-case";

describe('Get dashboard report use case', () => {
    let farmRepository: InMemoryFarmRepository;
    let cropsRepository: InMemoryCropRepository;
    let createFarmUseCase: CreateFarmUseCase;
    let createFarmCropUseCase: CreateFarmCropUseCase;
    let repository: InMemoryDashboardRepository;
    let useCase: GetDashboardUseCase;

    beforeAll(async () => {
        const farms = [
            {
                name: "Farm Name 1",
                city: "Farm City 1",
                state: "Farm State 1",
                agriculturalArea: 10,
                vegetationArea: 10,
                totalArea: 20,
                crops: [new Crop("Milho")],
                createdBy: 1,
            },
            {
                name: "Farm Name 2",
                city: "Farm City 2",
                state: "Farm State 2",
                agriculturalArea: 10,
                vegetationArea: 10,
                totalArea: 20,
                crops: [new Crop("Milho")],
                createdBy: 1,
            },
            {
                name: "Farm Name 3",
                city: "Farm City 1",
                state: "Farm State 1",
                agriculturalArea: 10,
                vegetationArea: 10,
                totalArea: 20,
                crops: [new Crop("Soja")],
                createdBy: 1,
            }
        ];

        farmRepository = new InMemoryFarmRepository();
        cropsRepository = new InMemoryCropRepository();
        createFarmCropUseCase = new CreateFarmCropUseCase(farmRepository, cropsRepository);
        createFarmUseCase = new CreateFarmUseCase(farmRepository, createFarmCropUseCase);
        repository = new InMemoryDashboardRepository();
        useCase = new GetDashboardUseCase(repository);

        for (const farm of farms) {
            await createFarmUseCase.create(farm);
        }
    });

    beforeEach(() => {
    });

    test('should return dashboard values correctly', async () => {
        const result = await useCase.getReport();

        expect(result).toEqual({
            farmTotal: 3,
            farmAreaTotal: 60,
            groupedByState: [
                {
                    name: "Farm State 1",
                    total: 2
                },
                {
                    name: "Farm State 2",
                    total: 1
                }
            ],
            groupedByCrop: [
                {
                    name: "Soja",
                    total: 1
                },
                {
                    name: "Milho",
                    total: 2
                },
            ],
            groupedBySolo: [
                {
                    name: "totalAgriculturalArea",
                    total: 30
                },
                {
                    name: "totalVegetationArea",
                    total: 30
                }
            ]
        });
    });
});
