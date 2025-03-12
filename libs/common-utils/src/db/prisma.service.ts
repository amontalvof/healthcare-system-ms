import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        (this as any).$on('beforeExit', async () => {
            await app.close();
        });
    }

    handlePrismaError(error: any): never {
        if (error.code === 'P2002') {
            const target = error.meta?.target;
            throw new RpcException({
                statusCode: 409,
                message: `A patient already exists for the combination of fields: ${target ? target.join(', ') : 'unknown'}.`,
            });
        }
        throw new RpcException(error);
    }
}
