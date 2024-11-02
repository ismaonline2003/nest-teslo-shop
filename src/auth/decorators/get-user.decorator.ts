import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest(); 
        const user = req.user;
        const userParams = {}

        if( !user ) {
            throw new InternalServerErrorException("User not found (request)");
        }

        if (data != undefined) {
            return user[data]
        } else {
            return user;
        }    
});


export const RawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest(); 
    return req.rawHeaders
});