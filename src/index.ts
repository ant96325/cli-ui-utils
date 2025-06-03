import Table from "cli-table";
import inquirer from "inquirer";
import chalk from "chalk";

type ListPrompt = {
    type: "list";
    name: "value";
    message: string;
    choices: any[];
};

type InputPrompt = {
    type: "input" | "number" | "password";
    name: "value";
    message: string;
    validate?: (input: any) => boolean | string;
};

const buildList = (list: any[]): Promise<{ value: string }> => {
    const prompt: ListPrompt = {
        type: "list",
        name: "value",
        message: chalk.yellow("Select the option:"),
        choices: list,
    };
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
    type: "input" | "number" | "text" | "password" | "list" | "checkbox" | "confirm" | "editor" | "expand" | "rawlist" | "search" | "select";
}

const buildInput = (message: string, type: InputType): Promise<{ value: string | number }> => {
    const prompt: InputPrompt = {
        type: type.type === "number" ? "number" : "input",
        name: "value",
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
    const answer = await inquirer.prompt({
        type: "list", 
        name: "answer",
        message: chalk.yellow(message),
        choices: ["Yes", "No"],
    });
    if (answer.answer == "Yes") return true;
    return false;
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

// Export all functions and types
export {
    buildList,
    buildTable,
    buildInput,
    yesNoQuesion,
    Logger
};

// Export types
export type { InputType, ListPrompt, InputPrompt };

// Export default logger instance
const logger = new Logger();
export default logger;