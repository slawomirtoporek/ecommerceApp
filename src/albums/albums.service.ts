import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<Album[]> {
    try {
      return await this.prismaService.album.findMany({
        include: {
          images: true,
          tracks: true,
        },
      });
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw error;
    }
  }

  public async getById(id: Album['id']): Promise<Album | null> {
    try {
      return await this.prismaService.album.findUnique({
        where: { id },
        include: {
          tracks: true,
          images: true,
        },
      });
    } catch (error) {
      console.error(`Error fetching album with id ${id}:`, error);
      throw error;
    }
  }
}
