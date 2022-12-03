import { neo4jDriver } from "../";
import { User } from "../schemas/User/User";
import { Query, Resolver } from "type-graphql";
// import { UserArgs } from "src/schemas/User/UserArgs";
import { Record } from "neo4j-driver";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getUser(/*@Args() params: UserArgs /**/) {
    const session = neo4jDriver.session();

    session.run("match (n:User) return n", {}).subscribe({
      onKeys: (/*keys: string[] /**/) => {
        // console.log(keys);
      },
      onNext: (record: Record) => {
        const n = record.get("n");
        console.log(n);
      },
      onCompleted: () => {
        session.close(); // returns a Promise
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
}
