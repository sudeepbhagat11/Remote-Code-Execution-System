"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ProblemDefinitionGenerator_1 = require("./ProblemDefinitionGenerator");
const FullProblemDefinitionGenerator_1 = require("./FullProblemDefinitionGenerator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generatePartialBoilerplate(generatorFilePath) {
    const inputFilePath = path_1.default.join(generatorFilePath, "Structure.md");
    const boilerplatePath = path_1.default.join(generatorFilePath, "boilerplate");
    // Read the input file
    const input = fs_1.default.readFileSync(inputFilePath, "utf-8");
    // Parse the input
    const parser = new ProblemDefinitionGenerator_1.ProblemDefinitionParser();
    parser.parse(input);
    // Generate the boilerplate code
    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const rustCode = parser.generateRust();
    const javaCode = parser.generateJava();
    // Ensure the boilerplate directory exists
    if (!fs_1.default.existsSync(boilerplatePath)) {
        fs_1.default.mkdirSync(boilerplatePath, { recursive: true });
    }
    // Write the boilerplate code to respective files
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.cpp"), cppCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.js"), jsCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.rs"), rustCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.java"), javaCode);
    console.log("Boilerplate code generated successfully!");
}
function generateFullBoilerPLate(generatorFilePath) {
    const inputFilePath = path_1.default.join(generatorFilePath, "Structure.md");
    const boilerplatePath = path_1.default.join(generatorFilePath, "boilerplate-full");
    // Read the input file
    const input = fs_1.default.readFileSync(inputFilePath, "utf-8");
    // Parse the input
    const parser = new FullProblemDefinitionGenerator_1.FullProblemDefinitionParser();
    parser.parse(input);
    // Generate the boilerplate code
    const cppCode = parser.generateCpp();
    const jsCode = parser.generateJs();
    const rustCode = parser.generateRust();
    const javaCode = parser.generateJava();
    // Ensure the boilerplate directory exists
    if (!fs_1.default.existsSync(boilerplatePath)) {
        fs_1.default.mkdirSync(boilerplatePath, { recursive: true });
    }
    // Write the boilerplate code to respective files
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.cpp"), cppCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.js"), jsCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.rs"), rustCode);
    fs_1.default.writeFileSync(path_1.default.join(boilerplatePath, "function.java"), javaCode);
    console.log("Boilerplate code generated successfully!");
}
const getFolders = (dir) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            }
            const folders = [];
            let pending = files.length;
            if (!pending)
                return resolve(folders);
            files.forEach((file) => {
                const filePath = path_1.default.join(dir, file);
                fs_1.default.stat(filePath, (err, stats) => {
                    if (err) {
                        return reject(err);
                    }
                    if (stats.isDirectory()) {
                        folders.push(file);
                    }
                    if (!--pending) {
                        resolve(folders);
                    }
                });
            });
        });
    });
};
function main() {
    fs_1.default.readdir(process.env.PROBLEMS_DIR_PATH || "", (err, files) => {
        files.forEach((file) => {
            if (file)
                generatePartialBoilerplate(path_1.default.join(process.env.PROBLEMS_DIR_PATH || "", file));
            generateFullBoilerPLate(path_1.default.join(process.env.PROBLEMS_DIR_PATH || "", file));
        });
    });
}
if (!process.env.PROBLEMS_DIR_PATH) {
    console.log("Store a valid problems dir path in .env", process.env.PROBLEMS_DIR_PATH);
}
else {
    getFolders(process.env.PROBLEMS_DIR_PATH).then((folders) => {
        folders.forEach((folder) => {
            generatePartialBoilerplate(path_1.default.join(process.env.PROBLEMS_DIR_PATH || "", folder));
            generateFullBoilerPLate(path_1.default.join(process.env.PROBLEMS_DIR_PATH || "", folder));
        });
    });
}
