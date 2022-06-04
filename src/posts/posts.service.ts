import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.save({
      ...createPostDto,
      user: {
        id: createPostDto.userId,
      },
    });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post: Post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post is not found');
    }

    return post;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete(id);
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
    return this.postsRepository.update(id, updatePostDto);
  }
}
