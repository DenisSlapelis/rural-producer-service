import { singleton } from "tsyringe";

@singleton()
export class PublicRoute {
    private publicRoutes: Record<string, string>;

    constructor() {
        this.publicRoutes = {
            '/healthcheck': 'GET',
            '/api/v1/login': 'POST',
        }
    }

    isPublicRoute = (route: string, method: string) => {
        const [routeWithoutParams] = route.split('?');

        const routeWithoutPathParams = routeWithoutParams.replace(/\/(\d+)/g, '/:id');

        return this.publicRoutes[routeWithoutPathParams] == method;
    }
}
