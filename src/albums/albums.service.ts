import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Album[]> {
    return this.prismaService.album.findMany({
      include: {
        images: true,
      },
    });
  }

  public getById(id: Album['id']): Promise<Album | null> {
    return this.prismaService.album.findUnique({
      where: { id },
      include: {
        tracks: true,
        images: true,
      },
    });
  }
}
