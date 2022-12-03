import { MaxLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserArgs {
  @Field()
  @MaxLength(30)
  id: string;

  @Field()
  @MaxLength(20)
  username: string;

  @Field()
  @MaxLength(30)
  displayName: string;

  @Field()
  joinDate: Date;

  @Field({ nullable: true })
  @MaxLength(120)
  bio: string;

  @Field()
  isVerified: boolean;

  @Field()
  accEnabled: boolean;

  @Field()
  @MaxLength(120)
  avatarUri: string;

  // Below this is purely a "cache" so we don't hit the database with a search every time
  @Field()
  chirpCount: number;

  @Field()
  follows: number;

  @Field()
  following: number;
}
