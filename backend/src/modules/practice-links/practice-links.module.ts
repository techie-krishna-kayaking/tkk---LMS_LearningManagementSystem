import { Module } from '@nestjs/common';
import { PracticeLinksController } from './practice-links.controller';
import { PracticeLinksService } from './practice-links.service';

@Module({
  controllers: [PracticeLinksController],
  providers: [PracticeLinksService],
})
export class PracticeLinksModule {}
