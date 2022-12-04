import { GraphQLError } from "graphql";
import { Args, Query, Resolver } from "type-graphql";

import { neo4jDriver } from "../";
import { User, UserNode } from "../schemas/User/User";
import { UserArgs } from "../schemas/User/UserArgs";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Args() args: UserArgs): Promise<User[]> {
    const session = neo4jDriver.session();

    let response: User[] = [];

    console.log(args);

    // run cypher in a transaction
    const txc = session.beginTransaction();

    let argsArray: string[] = [];

    if (args.id != null) argsArray.push("u.id=" + args.id);
    if (args.username != null) argsArray.push('u.username="' + args.username + '"');
    if (args.displayName != null) argsArray.push('u.displayName="' + args.displayName + '"');
    if (args.joinDate != null) argsArray.push('u.joinDate="' + args.joinDate + '"');
    if (args.isVerified != null) argsArray.push("u.isVerified=" + args.isVerified);

    console.log(argsArray.length);

    if (argsArray.length <= 0) throw new GraphQLError("Must query with at least one parameter");

    let argsCypher = argsArray.join(" and ");

    const cypher = `
    match (u:User)
    where
      ${argsCypher}
    return u
    `;

    console.log(cypher);

    try {
      const result = await txc.run<{ u: UserNode }>(cypher);

      await txc.commit();
      console.log("committed");

      result.records.map((r) => {
        response.push(r.get("u").properties);
      });
    } catch (error) {
      console.log(error);
      await txc.rollback();
      console.log("rolled back");
    } finally {
      await session.close();
    }

    // Just print and return the response
    // console.log("RETURN:");
    console.log(response);
    return response;
  }
}
