import { assertEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";
import * as _ from "../src/ceil.js";

Deno.test("ceil", () =>{
  assertEquals(_.ceil(4.006), 5)
  assertEquals(_.ceil(4.006), 6.01)
  assertEquals(_.ceil(4.006), 6100)
})
