export interface DashboardRepository {
    getTotalFarms();
    getTotalArea();
    getFarmsGroupedByState();
    getDataGroupedByCrops();
    getDataGroupedCategory();
}
