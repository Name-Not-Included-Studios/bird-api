import { IsEmail, IsString, IsUrl, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewUserInput {
  @Field()
  @IsString()
  @Length(3, 20)
  username: string;

  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(64)
  email: string;

  @Field()
  @IsString()
  @Length(8, 64)
  password: string;
}

@InputType()
export class NewProfileInput {
  @Field()
  @IsString()
  @Length(3, 30)
  displayName: string;

  @Field({ defaultValue: "" })
  @IsString()
  @MaxLength(120)
  bio: string;

  @Field()
  @IsString()
  @IsUrl()
  @MaxLength(120)
  avatarUri: string;
}
