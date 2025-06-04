### Installation
```bash
npm install cli-ui-utils
```

### For example

#### 1. *import* module

```javascript
import logger, 
  { 
    buildTable, 
    buildInput, 
    buildList, 
    buildCheckbox,
  } from  "cli-ui-utils";

async function main() {
  buildTable(
    "test", // title
    ["No", "Name", "Age", "City"], // headers
    [
      ["John", "20", "New York"],
      ["Jane", "21", "Los Angeles"],
      ["Jim", "22", "Chicago"],
    ] //  body
  );

  buildTable(
    "test", // title
    ["Name", "Value"], // headers
    [
      ["name", "TradingToken"],
      ["symbol", "TT"],
      ["decimals", "6"],
    ], //  body
    false // true: show number, false: hide number field
  );

  const input = await buildInput("Input your name:", { type: "input" });
  console.log("Your name is: ", input.value);

  const list = await buildList(["option1", "option2", "option3"]);
  console.log("Your favorite option is: ", list.value);

  const checkbox = await buildCheckbox("Select your favorite color:", [
    { name: "red", checked: true },
    { name: "green", checked: false },
    { name: "blue", checked: false },
  ]);
  console.log("Your favorite color is: ", checkbox.value);

  logger.success("test logger success");
  logger.info("test logger");
  logger.error("test logger error");
  logger.warn("test logger warn");
  
}

main();
```


#### 2. *require* module

```javascript
const { buildTable, buildInput, buildList, buildCheckbox } = require("cli-ui-utils");
const logger = require("cli-ui-utils").default;

async function main() {
  buildTable(
    "test", // title
    ["No", "Name", "Age", "City"], // headers
    [
      ["John", "20", "New York"],
      ["Jane", "21", "Los Angeles"],
      ["Jim", "22", "Chicago"],
    ] //  body
  );

  buildTable(
    "test", // title
    ["Name", "Value"], // headers
    [
      ["name", "TradingToken"],
      ["symbol", "TT"],
      ["decimals", "6"],
    ], //  body
    false // true: show number, false: hide number field
  );

  const input = await buildInput("Input your name:", { type: "input" });
  console.log("Your name is: ", input.value);

  const list = await buildList(["option1", "option2", "option3"]);
  console.log("Your favorite option is: ", list.value);

  const checkbox = await buildCheckbox("Select your favorite color:", [
    { name: "red", checked: true },
    { name: "green", checked: false },
    { name: "blue", checked: false },
  ]);
  console.log("Your favorite color is: ", checkbox.value);

  logger.success("test logger success");
  logger.info("test logger");
  logger.error("test logger error");
  logger.warn("test logger warn");
  
}

main();
```