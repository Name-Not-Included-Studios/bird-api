import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

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
  isverified: boolean;

  @Field()
  isadmin: boolean;

  @Field()
  accEnabled: boolean;

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
