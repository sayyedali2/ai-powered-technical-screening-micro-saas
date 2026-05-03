import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Body } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ai')
  async generateResponse(@Body() body :{message:string}){
    const ans = await this.appService.generateResponse(body.message)
    return ans
  }
}
