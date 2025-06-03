import logger, { buildTable, buildInput, buildList } from "cli-ui-utils";

buildTable("test", ["name", "age", "city"], [
  [
    "John",
    "20",
    "New York",
  ],
]);

buildInput("test", { type: "input" });

buildList(["test", "test2", "test3"]);

logger.info("test");