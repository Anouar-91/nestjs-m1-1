import { UserService } from './../services/user.service';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('users') // route http://localhost:3000/users/
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  returnAllUsers(): string {
    console.log(this.userService.findAll());
    return JSON.stringify(this.userService.findAll());
  }

  @Get('user/:id') // http://localhost:3000/users/user/{id}
  returnOneUser(@Param() params): string {
    console.log('Params : ', params);
    console.log('Params.id : ', params.id);
    console.log('User : ', this.userService.findOne(parseInt(params.id)));
    return JSON.stringify(this.userService.findOne(parseInt(params.id)));
  }

  @Get('log-request') // http://localhost:3000/users/log-request
  returnRequestObject(@Req() request: Request): void {
    console.log(request);
  }

  @Get('with-params') // http://localhost:3000/users/with-params?limit=2
  getUrlQueryParams(@Query() queryString) {
    console.log(typeof queryString);
    console.log(queryString);
    return queryString;
  }

  @Get('redirect') // http://localhost:3000/users/redirect
  @Redirect('/users/redirected', 301)
  redirectUser(): void {
    console.log('Redirecting ...');
  }

  @Get('redirected')
  redirectedUser(): string {
    console.log('We have been redirected !!');
    return 'We have been redirected !!';
  }

  @Post('add')
  @HttpCode(201)
  @Header('Cache-Control', 'no-cache')
  postNewUser(@Body() bodyContent) {
    console.log('bodyContent: ', bodyContent);
    console.log('type de bodyContent: ', typeof bodyContent);
    this.userService.create(this.userService.formatRawApiData(bodyContent));
    console.log(this.userService.findAll());
    return bodyContent;
  }
}
