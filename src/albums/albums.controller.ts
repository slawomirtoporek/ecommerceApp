import {
  Controller,
  ParseUUIDPipe,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get('/')
  getAll() {
    return this.albumsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.getById(id);

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }
}
