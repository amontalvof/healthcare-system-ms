import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

describe('ChatbotController', () => {
  let chatbotController: ChatbotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotController],
      providers: [ChatbotService],
    }).compile();

    chatbotController = app.get<ChatbotController>(ChatbotController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatbotController.getHello()).toBe('Hello World!');
    });
  });
});
