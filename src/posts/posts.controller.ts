import { Body, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/users.entity';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';

class PostCreateRequestBody {
  @ApiProperty() text: string;
  @ApiPropertyOptional() originalPostId: string;
  @ApiPropertyOptional() replyToPostId: string;
}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postsService.getAllPosts();
  }

  @Get('/:postid')
  getPostDetails(@Param('postid') postid: string): string {
    // TODO
    return `details of postid = ${postid}`;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewPost(
    @User() author: UserEntity,
    @Body() post: PostCreateRequestBody,
  ): Promise<PostEntity> {
    const createdPost = await this.postsService.createPost(
      post,
      author,
      post.originalPostId,
      post.replyToPostId,
    );
    return createdPost;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postid')
  async deletePost(@Param('postid') postid: string): Promise<string> {
    // TODO
    return `delete postid = ${postid}`;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:postid/like')
  async likePost(@Param('postid') postid: string): Promise<string> {
    return `liked post ${postid}`;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:postid/like')
  async unlikePost(@Param('postid') postid: string): Promise<string> {
    return `unliked post ${postid}`;
  }
}
