import "reflect-metadata"
import { container } from 'tsyringe';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { HealthCheckController } from '@controllers/healthcheck.controller';
import { HealthCheckRepository } from '@repositories/healthcheck.repository';
import { HealthCheckService } from '@services/healthcheck.service';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { PublicRoute } from '@routes/public-routes';
import { Environment } from '../config/envs/environment';
import { SQLiteDatabase } from '../config/database/SQLiteDatabase.adapter';
import { ParameterStore } from './parameter-store.utils';
import { AsyncEnvs } from '../config/envs/async-envs';
import { ConfigService } from '@services/config.service';
import { ConfigController } from '@controllers/config.controller ';
import { CreateRuralProductorController } from "@controllers/rural-productor/create-rural-productor.controller";
import { CreateRuralProductorUseCase } from "src/use-cases/rural-productor/create-rural-productor.use-case";
import { SQLiteRuralProductorRepository } from "@repositories/rural-productor/sqlite-rural-productor.repository";
import { LoginController } from "@controllers/login.controller";

// Singletons
export const env = container.resolve(Environment);
export const database = container.resolve(SQLiteDatabase);
export const parameterStore = container.resolve(ParameterStore);
export const asyncEnvs = container.resolve(AsyncEnvs);
export const loggerMiddleware = container.resolve(LoggerMiddleware);
export const publicRoute = container.resolve(PublicRoute);
export const authMiddleware = container.resolve(AuthMiddleware);

// Configurar o container de injeção de dependências
container.register<HealthCheckRepository>('HealthCheckRepository', { useClass: HealthCheckRepository });
container.register<HealthCheckService>('HealthCheckService', { useClass: HealthCheckService });
container.register<ConfigService>('ConfigService', { useClass: ConfigService });
container.register<CreateRuralProductorUseCase>('CreateRuralProductorUseCase', { useClass: CreateRuralProductorUseCase });
container.register('RuralProductorRepository', { useClass: SQLiteRuralProductorRepository});

// Resolver as dependências
export const healthCheckController = container.resolve<HealthCheckController>(HealthCheckController);
export const loginController = container.resolve<LoginController>(LoginController);
export const configController = container.resolve<ConfigController>(ConfigController);

// Rrual Productor
export const createRuralProductorController = container.resolve<CreateRuralProductorController>(CreateRuralProductorController);

export const dependencies = container;

