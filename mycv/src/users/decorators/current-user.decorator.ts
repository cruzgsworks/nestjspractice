import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'

// type never = do not give any arguments
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId)
        return 'hi there!';
    }
)