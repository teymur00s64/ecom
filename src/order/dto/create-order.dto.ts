import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, Length, Min, ValidateNested } from "class-validator";

export class CreateOrderItemDto {
    
    @Type()
    @ApiProperty()
    @IsNumber()
    productId: number;
}

export class CreateOrderDto {
    
    @Type()
    @ApiProperty()
    @IsString()
    @Min(10)
    address: string;

    @Type()
    @ApiProperty()
    @IsString()
    @Length(3, 11)
    postCode: string;

    @Type()
    @ApiProperty()
    @IsString()
    phone: string;

   @Type(() => CreateOrderItemDto)
   @ValidateNested({each: true})
   @ApiProperty({type: CreateOrderItemDto, isArray: true})
   items: CreateOrderItemDto[];

}