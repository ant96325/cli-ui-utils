### Installation
```bash
npm install cli-ui-utils
```

### For example

#### *import* module

```javascript
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
```


#### *require* module

```javascript
const { buildTable, buildInput, buildList } = require("cli-ui-utils");
const logger = require("cli-ui-utils").default;

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
```