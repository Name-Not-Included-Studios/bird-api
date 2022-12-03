import { MaxLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserArgs {
  @Field({ nullable: true })
  @MaxLength(30)
  id?: string;

  @Field({ nullable: true })
  @MaxLength(20)
  username?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  displayName?: string;

  @Field({ nullable: true })
  joinDate?: Date;

  @Field({ nullable: true })
  @MaxLength(120)
  bio?: string;

  @Field({ nullable: true })
  isVerified?: boolean;

  @Field({ nullable: true })
  isEnabled?: boolean;

  @Field({ nullable: true })
  @MaxLength(120)
  avatarUri?: string;

  // Below this is purely a "cache" so we don't hit the database with a search every time
  @Field({ nullable: true })
  chirpCount?: number;

  @Field({ nullable: true })
  follows?: number;

  @Field({ nullable: true })
  following?: number;
}
