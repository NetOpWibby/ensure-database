


///  I M P O R T

import print from "@webb/console";
import { r } from "rethinkdb-ts";

///  U T I L

interface DatabaseInput {
  name: string;
  options?: {
    // https://rethinkdb.com/api/javascript/connect
    // https://github.com/rethinkdb/rethinkdb-ts/blob/master/test/config.ts
    buffer?: number;
    db?: string;
    discovery?: boolean;
    host?: string;
    max?: number;
    password?: string;
    port?: number;
    silent?: boolean;
    timeout?: number;
    user?: string;
  };
};



///  E X P O R T

export default ensureDatabase;

export async function ensureDatabase(database: DatabaseInput) {
  let { name, options } = database;

  options = {
    buffer: 2,
    db: name,
    discovery: false,
    host: "localhost",
    max: 5,
    password: "",
    port: 28015,
    silent: true,
    user: "admin",
    // supplied overrides
    ...options
  };

  const databaseConnection = await r.connect(options);
  const databaseList = await r.dbList().run(databaseConnection);

  if (!databaseList.includes(name)) {
    await r.dbCreate(name).run(databaseConnection);
    process.stdout.write("[rethinkdb] table created: " + print.bold(name) + "\n");
  } else {
    process.stdout.write("[rethinkdb] table ready: " + print.bold(name) + "\n");
  }

  databaseConnection.close();
};
