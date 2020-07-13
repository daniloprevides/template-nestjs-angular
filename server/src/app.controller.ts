import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("info")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getInfo(): any {
    return {
      description: 'Quest API',
      docUrl: '/api'
    };
  }
}
