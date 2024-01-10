import { format, createLogger, addColors, transports as winstonTransport } from 'winston';
const { combine, colorize } = format;
const colorizer = colorize();
const winstonConsole = new winstonTransport.Console({ level: 'debug' });

export class WinstonAdapter {
    level: any;
    transports: any[];
    options: any;

    constructor({ level }) {
        this.level = level || 'info';
        this.transports = [winstonConsole];
        this.options = this.formatOptions();
    }

    private formatOptions() {
        return {
            level: this.level,
            exitOnError: false,
            format: combine(
                format.json(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:MM:SS',
                }),
                format.printf((logMessage) => {
                    const { level, timestamp, message } = logMessage;
                    const fullMessage = `[${timestamp}] - [${level.toLocaleUpperCase()}] ${message}`;

                    return colorizer.colorize(level, fullMessage);
                })
            ),
            transports: this.transports,
        };
    }

    getLogger() {
        addColors({
            error: 'redBG',
            warn: 'yellow',
            info: 'blue',
            debug: 'yellowBG',
        });

        return createLogger(this.options);
    }
}
