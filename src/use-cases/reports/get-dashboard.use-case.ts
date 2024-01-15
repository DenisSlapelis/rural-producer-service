import { GetDashboardResponse } from '@dtos/report.dto';
import { DashboardRepository } from '@interfaces/dashboard-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class GetDashboardUseCase {
    constructor(private repository: DashboardRepository) {
    }

    getReport = async (): Promise<GetDashboardResponse> => {
        const [farms, totalArea, groupedByState, groupedByCrops, [groupedBySolo]] = await Promise.all([
            this.repository.getTotalFarms(),
            this.repository.getTotalArea(),
            this.repository.getFarmsGroupedByState(),
            this.repository.getDataGroupedByCrops(),
            this.repository.getDataGroupedCategory(),
        ]);

        return this.toResponseFormat({ farms, totalArea, groupedByState, groupedByCrops, groupedBySolo });
    }

    private toResponseFormat(params: any): GetDashboardResponse {
        return {
            farmTotal: params.farms.total,
            farmAreaTotal: params.totalArea.total,
            groupedByState: params.groupedByState.map(row => ({
                name: row.state,
                total: row.total,
            })),
            groupedByCrop: params.groupedByCrops,
            groupedBySolo: [
                {
                    name: "totalAgriculturalArea",
                    total: params.groupedBySolo.totalAgriculturalArea
                },
                {
                    name: "totalVegetationArea",
                    total: params.groupedBySolo.totalVegetationArea
                },
            ]
        }
    }
}
