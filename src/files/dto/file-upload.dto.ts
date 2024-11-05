import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty({
        description: "Here goes the file which will be uploaded"
    })
    file: string;
}