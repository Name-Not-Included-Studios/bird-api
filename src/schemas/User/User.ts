import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id?: number;

  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  password: string;

  @Field()
  joinDate: Date;

  @Field()
  bio: string;

  @Field()
  isVerified: boolean;

  @Field()
  isAdmin: boolean;

  @Field()
  isEnabled: boolean;

  @Field()
  avatarUri: string;

  // Below this is purely a "cache" so we don't hit the database with a search every time
  @Field()
  chirpCount: number;

  @Field()
  follows: number;

  @Field()
  following: number;
}
