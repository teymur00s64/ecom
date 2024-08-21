import { ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class GetProductDto {
    @Type()
    @IsOptional()
    @ApiProperty({default: 'phone', required: false})
    @IsString()
    name: string
    
    @Type()
    @IsOptional()
    @ApiProperty({default: 0, required: false})
    @IsNumber({}, {each: true})
    MinPrice: number

    @Type()
    @IsOptional()
    @ApiProperty({default: 0, required: false})
    @IsNumber({}, {each: true})
    MaxPrice: number

    @Type()
    @IsOptional()
    @ApiProperty({default: '1,2,3,...', type:String, required: false})
    @Transform(({value}) =>  value?.split(','))
    categories: number[]

    @Type()
    @IsOptional()
    @ApiProperty({default: 5, required: false})
    @IsNumber({}, {each: true})
    limit: number
    
    @Type()
    @IsOptional()
    @ApiProperty({default: 0, required: false})
    @IsNumber({}, {each: true})
    page: number
}