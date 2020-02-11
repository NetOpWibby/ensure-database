


//  I M P O R T

import { r } from "rethinkdb-ts";

//  U T I L

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



//  E X P O R T

export default async(database: DatabaseInput) => {
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
    // User overrides
    ...options
  };

  const databaseConnection = await r.connect(options);
  const databaseList = await r.dbList().run(databaseConnection);

  if (!databaseList.includes(name)) {
    await r.dbCreate(name).run(databaseConnection);
    console.log(`⚡️ Created database "${name}"`);
  } else console.log(`✨ Database "${name}" exists`);

  databaseConnection.close();
};
