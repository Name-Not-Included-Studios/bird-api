import { Args, Query, Resolver } from "type-graphql";

import { neo4jDriver } from "../";
import { User, UserNode } from "../schemas/User/User";
import { UserArgs } from "../schemas/User/UserArgs";

// import { Record } from "neo4j-driver";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Args() _args: UserArgs): Promise<User[]> {
    const session = neo4jDriver.session();

    let response: User[] = [];

    // run cypher in a transaction
    const txc = session.beginTransaction();

    try {
      const result = await txc.run<{ a: UserNode }>(`match (a:User) return a`);

      await txc.commit();
      console.log("committed");

      result.records.map((r) => {
        response.push(r.get("a").properties);
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
