import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
/*IMPORTS*/

@Module({
  imports: [StoriesModule, AuthModule, HttpModule /*MODULES*/],
  controllers: [AppController],
  providers: [AppService],
  exports: [HttpModule]
})
export class AppModule {
  
}
