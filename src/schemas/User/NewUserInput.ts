import { ArrayMaxSize, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field((type) => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}
