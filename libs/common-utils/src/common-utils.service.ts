import { Injectable } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class CommonUtilsService {
    colorLogger({
        type,
        message,
        context,
    }: {
        type: string;
        message: string;
        context?: string;
    }): void {
        const resolveMsg = (msg: string, ctx?: string) => {
            return ctx ? `[${ctx}] ${msg}` : msg;
        };
        const colorLoggerMap = {
            log: (msg: string, ctx?: string): void => {
                console.log(
                    chalk.cyan(
                        `${chalk.black.bgCyan(' LOG ')} ${resolveMsg(msg, ctx)}`,
                    ),
                );
            },
            error: (msg: string, ctx?: string): void => {
                console.error(
                    chalk.red(
                        `${chalk.black.bgRed(' ERROR ')} ${resolveMsg(msg, ctx)}`,
                    ),
                );
            },
            warn: (msg: string, ctx?: string): void => {
                console.warn(
                    chalk.yellow(
                        `${chalk.black.bgYellow(' WARN ')} ${resolveMsg(msg, ctx)}`,
                    ),
                );
            },
            debug: (msg: string, ctx?: string): void => {
                console.debug(
                    chalk.magenta(
                        `${chalk.black.bgMagenta(' DEBUG ')} ${resolveMsg(msg, ctx)}`,
                    ),
                );
            },
            verbose: (msg: string, ctx?: string): void => {
                console.info(
                    chalk.blue(
                        `${chalk.black.bgBlue(' VERBOSE ')} ${resolveMsg(msg, ctx)}`,
                    ),
                );
            },
        };
        const action = colorLoggerMap[type];
        if (action) {
            action(message, context);
        }
    }
}
