import { test } from "node:test";
import assert from "node:assert/strict";

test("true != false", () => {
     const truth: boolean = true;
     assert.notEqual(truth, false);
});
