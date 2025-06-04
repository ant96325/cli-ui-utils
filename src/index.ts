import Table from "cli-table";
import chalk from "chalk";

// Add type for inquirer
type Inquirer = {
    prompt: typeof import('inquirer').default.prompt;
};

// Cache for inquirer instance
let inquirerInstance: Inquirer | null = null;

// Function to get inquirer instance
async function getInquirer(): Promise<Inquirer> {
    if (!inquirerInstance) {
        const inq = await import('inquirer');
        inquirerInstance = { prompt: inq.default.prompt };
    }
    return inquirerInstance;
}

type ListPrompt = {
    type: "list";
    name: "value";
    message: string;
    choices: any[];
};

type CheckboxPrompt = {
    type: "checkbox";
    name: "value";
    message: string;
    choices: any[];
};

type InputPrompt = {
    type: any;
    name: "value";
    message: string;
    default?: any;
    validate?: (input: any) => boolean | string;
};

const buildList = async (choices: any[]): Promise<{ value: string }> => {
    const inquirer = await getInquirer();
    const prompt: ListPrompt = {
        type: "list",
        name: "value",
        message: chalk.yellow("Select the option:"),
        choices: choices,
    };
    return inquirer.prompt(prompt);
}

const buildCheckbox = async (message: string, choices: any[]): Promise<{ value: any[] }> => {
    const inquirer = await getInquirer();
    const prompt: CheckboxPrompt = {
        type: "checkbox",
        name: "value",
        message: message,
        choices: choices,
    }
    return inquirer.prompt(prompt);
}

function _isAddress(value: string): boolean {
    // EVM address
    if (value.startsWith("0x") && value.length === 42) return true;

    // Solana address
    const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
    if (base58Regex.test(value) && value.length === 44) return true;

    return false;
}

const buildTable = (
    title: string = "",
    header: string[],
    body: any[],
    isNumbered: boolean = true,
) => {
    header = header.map((item) => chalk.cyan(item));
    body = body.map((row) => row.map((item: string) => _isAddress(item) ? chalk.green(item) : !isNaN(parseFloat(item)) ? chalk.yellow(item) : chalk.white(item)));
    var table = new Table({
        head: header,
    });

    const numberedBody = isNumbered ? body.map((row, index) => [`${index + 1}`, ...row]) : body;

    table.push(...numberedBody)
    
    if (title.length > 0) {
        const width = table.width - 10;
        const sideWidth = (width - title.length - 2) / 2;
        console.log("\n"+"=".repeat(sideWidth) + ` ${chalk.yellowBright(title)} ` + "=".repeat(sideWidth));
    }
    console.log(table.toString()+"\n")
}

interface InputType {
    type: "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime" | "time" | "filepath" | "editor" | "list" | "rawlist" | "expand" | "checkbox" | "password" | "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select" | "date" | "datetime",
    default?: any
}

const buildInput = async (message: string, type: InputType): Promise<{ value: any }> => {
    const inquirer = await getInquirer();
    const prompt: InputPrompt = {
        type: type.type,
        name: "value",
        default: type.default,
        message: chalk.yellow(message),
        validate: (data: any) => {
            if (data == undefined) {
                return "Input cannot be empty";
            }
            return true;
        },
    };
    return inquirer.prompt(prompt);
}

const yesNoQuesion = async(message: string) => {
    const inquirer = await getInquirer();
    const answer = await inquirer.prompt({
        type: "confirm", 
        name: "value",
        message: chalk.yellow(message),        
    });
    return answer.value;
}

class Logger {
    
    private prefix: string;
    
    constructor() {
        this.prefix = chalk.green(`${process.pid}`);
    }

    info(message: string, info: any = "") {
        console.log(`${this.prefix} | ${chalk.blue("INFO ")} | ${chalk.white("" + message)}`, info)
    }

    warn(message: string, info: any = "") {
        console.log(`${this.prefix} | ${chalk.yellow("WARN ")} | ${chalk.white("" + message)}`, info)
        
    }

    error(message: string, error: any = "") {
        console.log(`${this.prefix} | ${chalk.red("ERROR")} | ❌ ${message}`, error)
    }

    success(message: string, info: any = "") {
        console.log(`${this.prefix} | ${chalk.green("SUCCESS")} | ✅ ${message}`, info)
    }
}

// Export types
export type { InputType, ListPrompt, InputPrompt };

// Create logger instance
const logger = new Logger();

// Export everything as named exports
export {
    buildList,
    buildTable,
    buildInput,
    buildCheckbox,
    yesNoQuesion,
    Logger
};

// Export logger as default
export default logger;

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    // Export everything as named exports
    Object.assign(module.exports, {
        buildList,
        buildTable,
        buildInput,
        buildCheckbox,
        yesNoQuesion,
        Logger,
        logger
    });
    
    // Also export default for ESM compatibility
    module.exports.default = logger;
}