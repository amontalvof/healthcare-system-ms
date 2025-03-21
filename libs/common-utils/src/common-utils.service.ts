import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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
    handleTypeOrmError(error: any): never {
        // PostgreSQL duplicate key violation error code
        if (error.code === '23505') {
            // error.detail typically looks like:
            // "Key (email)=(m1903003@itcelaya.edu.mx) already exists."
            const regex = /Key \((.*?)\)=\((.*?)\)/;
            const matches = regex.exec(error.detail);
            const duplicateField =
                matches && matches[1] ? matches[1] : 'unknown field';

            throw new RpcException({
                statusCode: 409,
                message: `A record already exists for the field: ${duplicateField}.`,
            });
        }
        throw new RpcException(error);
    }
}
