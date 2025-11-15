import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';

interface AuthenticatedRequest {
  user: {
    sub: number;
    email: string;
    role: string;
  };
}

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getFavorites(@Req() req: AuthenticatedRequest) {
    return this.usersService.getFavorites(req.user.sub);
  }

  @Post(':stationId')
  toggleFavorite(
    @Req() req: AuthenticatedRequest,
    @Param('stationId', ParseIntPipe) stationId: number,
  ) {
    return this.usersService.toggleFavorite(req.user.sub, stationId);
  }
}
