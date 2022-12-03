import { Args, Query, Resolver } from 'type-graphql';

import { neo4jDriver } from '../';
import { User } from '../schemas/User/User';
import { UserArgs } from '../schemas/User/UserArgs';

// import { Record } from "neo4j-driver";

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	async getUsers(@Args() args: UserArgs /**/) {
		const session = neo4jDriver.session();

		let response: User[] = [];
		console.log(args);

		/*
      There are 3 ways of doing this:
        Subscribe Events
        The Promise Way
        In a Transaction
      
      There is also an alternative for each of these called a Reactive Session
      which I couldn't get working
      
      The first 2 will always run async and
      will NOT wait for the records to continue execution

      The third does wait for the records to return therefore it 
      can add to the res (Response) array before getUsers() returns
      
      This is great right? Yes, but it takes 500ms+
      when I can run the same query in the neo4j browser
      and have req and res in less than 2 ms... Woah, that's over the internet
      that's like REALLY good

      Also, even though I am returning a User[] from this function (as specified in docs),
      the Apollo web interface is giving me this:

        {
          "data": {},
          "error": {
            "message": "JSON.parse: unexpected character at line 1 column 1 of the JSON data"
          }
        }
    */

		// Subscribe Events
		// session.run(`match (n:User {id: ${args.id}}) return n`, {}).subscribe({
		//   onKeys: (/*keys: string[]*/) => {
		//     // console.log(keys);
		//   },
		//   onNext: (record: Record) => {
		//     const n = record.get("n");
		//     response.push(n);
		//     console.log(n);
		//   },
		//   onCompleted: () => {
		//     session.close(); // returns a Promise
		//   },
		//   onError: (error) => {
		//     console.log(error);
		//   },
		// });

		// The Promise Way
		// session
		//   .run(`match (n:User) return n`, {})
		//   .then((result) => {
		//     result.records.forEach((record) => {
		//       console.log(record.get("n"));
		//       response.push(record.get("n"));
		//     });
		//   })
		//   .catch((error) => {
		//     console.log(error);
		//   })
		//   .then(() => session.close());

		// run statement in a transaction
		const txc = session.beginTransaction();
		try {
			const result = await txc.run(`match (a:User) return a`, {});

			result.records.map((r) => {
				response.push(r.get("a"));
			});

			console.log("First query completed");

			await txc.commit();
			console.log("committed");
		} catch (error) {
			console.log(error);
			await txc.rollback();
			console.log("rolled back");
		} finally {
			await session.close();
		}

		// Just print and return the response
		console.log("RETURN:");
		console.log(response);
		return response;
	}
}
