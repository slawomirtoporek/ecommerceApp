import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}
}
