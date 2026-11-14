import { Logger, winstonLogger } from '@SiarhKul/jobber-shared';
import { Application } from 'express';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger('gatewayServer', 'debug');

export class GatewayServer {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
		this.securityMiddleware(app);
	}

	public start(): void {
		this.app.listen(SERVER_PORT, () => {
			log.info(`Gateway server running on port ${SERVER_PORT}`);
		});
	}

	private securityMiddleware(app: Application): void {
		app.set('trust proxy', 1);
		app.use(
			cookieSession({
				name: 'session',
				keys: [],
				maxAge: 24 * 7 * 3600000,
				secure: false, // update with value from config
				// sameSite: 'none'
			})
		);
		app.use(hpp());
		app.use(helmet());
		app.use(
			cors({
				origin: '',
				credentials: true,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
			})
		);
	}
}
