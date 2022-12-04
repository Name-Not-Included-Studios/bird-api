import { MaxLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserArgs {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  @MaxLength(20)
  username?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  displayName?: string;

  @Field({ nullable: true })
  joinDate?: Date;

  @Field({ nullable: true })
  isVerified?: boolean;
}
