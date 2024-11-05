import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/index';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { FileUploadDto } from './dto/file-upload.dto';

@ApiTags('Files - Get and Upload')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  @ApiParam({name: "imageName", type: "string", example: "8529354-00-A_0_2000.jpg"})
  @ApiResponse({ status: 201, description: "File sended", example: "*File*"})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 404, description: "Image not found"})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    
    res.sendFile(path);
  }

  @Post('product')
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  @ApiResponse({ status: 201, description: "Image Uploaded", example: { "secureUrl": "http://localhost:3000/api/files/product/282f131b-423e-4e5e-94df-9e24fdff7205.jpeg" }})
  @ApiResponse({ status: 400, description: "Bad Request"})
  @ApiResponse({ status: 403, description: "Forbidden. Token Related."})
  @ApiResponse({ status: 500, description: "Internal Server Error."})
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize: 1000},
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }) )
  uploadProductImage( 
    @UploadedFile() file: Express.Multer.File
  ) {
    

    if( !file ) {
      throw new BadRequestException("Make sure that the file is an image.");
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {secureUrl};
  }
}
