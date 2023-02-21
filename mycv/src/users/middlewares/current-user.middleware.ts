import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session'
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
    namespace Express {
        interface Request {
            session?: Session,
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.session);

    const { userId } = req.session || {};

    if(userId) {
        const user = await this.usersService.findOne(userId);
        
        req.currentUser = user;
    }

    next();
  }
}
