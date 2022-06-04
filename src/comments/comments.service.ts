import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create({ text, userId, postId }: CreateCommentDto) {
    return this.commentsRepository.save({
      text,
      user: {
        id: userId,
      },
      post: {
        id: postId,
      },
    });
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const comment: Comment = await this.commentsRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment is not found');
    }

    return comment;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.commentsRepository.delete(id);
  }

  update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentsRepository.update(id, updateCommentDto);
  }
}
