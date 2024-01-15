type ChartItem = {
    name: string;
    total: number;
}

export interface GetDashboardResponse {
    farmTotal: number;
    farmAreaTotal: number;
    groupedByState: Array<ChartItem>;
    groupedByCrop: Array<ChartItem>;
    groupedBySolo: Array<ChartItem>;
}
