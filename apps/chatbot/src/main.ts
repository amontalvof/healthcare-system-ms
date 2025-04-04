import { NestFactory } from '@nestjs/core';
import { ChatbotModule } from './chatbot.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatbotModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
