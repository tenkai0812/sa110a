import { assertEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";
import * as _ from "../src/devide.js";

Deno.test("devide", () => {
    assertEquals(_.devide(6, 4), 1.5)
})