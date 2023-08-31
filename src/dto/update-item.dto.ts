import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateItemDto 
{
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly description:string;
    readonly status:boolean;
    readonly markdown: string;
    readonly title: string;
}
