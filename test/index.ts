


//  N A T I V E

import assert from "assert";

//  I M P O R T S

import { r } from "rethinkdb-ts";
import Test from "@webb/test";

//  U T I L

import ensureDatabase from "../dist";



//  T E S T S

const test = Test("@webb/ensure-database");

test("Fails when 'name' is not defined", async() => {
  await assert.rejects(async() => {
    await ensureDatabase({ name });
  }, {
    message: "name is not defined",
    name: "ReferenceError"
  });
});

test("Fails to connect to database", async() => {
  await assert.rejects(async() => {
    await ensureDatabase({ name: "test_db" });
  }, {
    message: "connect ECONNREFUSED 127.0.0.1:28015",
    name: "Error"
  });
});

test.run();
