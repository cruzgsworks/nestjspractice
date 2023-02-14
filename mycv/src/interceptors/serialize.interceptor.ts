import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToInstance } from "class-transformer";

// For type safety
interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Run something before a request is handled
        // by the request handler
        console.log("I'm running before the handler", context)
        return next.handle().pipe(
            map((data: any) => {
                console.log(data);
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        );
    }

}