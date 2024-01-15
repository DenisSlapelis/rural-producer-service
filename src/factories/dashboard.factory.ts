import { SQLiteDashboardRepository } from "@repositories/report/SQLiteDashboard.repository";
import { GetDashboardUseCase } from "@useCases/reports/get-dashboard.use-case";
import { GetDashboardController } from "@controllers/report/get-dashboard.controller";

export const makeGetDashboardController = (): GetDashboardController => {
    const useCase = makeGetRuralProducerByIdUseCase();

    return new GetDashboardController(useCase);
}

export const makeGetRuralProducerByIdUseCase = () => {
    const repository = new SQLiteDashboardRepository();

    return new GetDashboardUseCase(repository);
}
