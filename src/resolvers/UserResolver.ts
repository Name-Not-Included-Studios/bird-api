import { User } from "src/schemas/User/User";
import { UserArgs } from "src/schemas/User/UserArgs";
import { NewUserInput } from "src/schemas/User/NewUserInput";
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(User)
export class UserResolver {
  // @Query(() => User)
  // async getUser(@Args() params: UserArgs): Promise<User> {
  // }
}
