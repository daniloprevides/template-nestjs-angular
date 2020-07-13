"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var chalk = require("chalk");
var figlet = require("figlet");
var inquirer = require("inquirer");
var path = __importStar(require("path"));
var console_1 = require("console");
var fs_1 = __importDefault(require("fs"));
var Main = /** @class */ (function () {
    function Main() {
        this.sourcePath = "../../api/src";
        this.modulePath = "../../api/src/app.module.ts";
        this.templatesPath = "./templates/module";
        this.start();
    }
    Main.prototype.start = function () {
        console_1.clear();
        console.log(chalk.yellow(figlet.textSync("API Gen", { horizontalLayout: "full" })));
        this.startQuestions();
    };
    Main.prototype.capitalizeFirstLetter = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    Main.prototype.startQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer.prompt([
                            { type: "string", message: "Qual o nome do módulo?", name: "moduleName" },
                        ])];
                    case 1:
                        answer = _a.sent();
                        if (!answer || !answer.moduleName) {
                            console.log("Por favor, os dados precisam ser informados");
                            this.startQuestions();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.startProcess(answer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.startProcess = function (answer) {
        return __awaiter(this, void 0, void 0, function () {
            var srcPath, moduleAsClassName, connectionName, moduleName, lcModuleName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcPath = path.join(__dirname, this.sourcePath, answer.moduleName);
                        moduleAsClassName = this.capitalizeFirstLetter(answer.moduleName.toLocaleLowerCase());
                        connectionName = moduleAsClassName + "Module";
                        moduleName = connectionName;
                        lcModuleName = answer.moduleName.toLowerCase();
                        //Verificando se o módulo existe
                        if (fs_1.default.existsSync(srcPath)) {
                            console.error("O módulo existe", srcPath);
                            return [2 /*return*/];
                        }
                        else {
                            fs_1.default.mkdirSync(srcPath);
                        }
                        return [4 /*yield*/, this.createFolderStructure(srcPath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createEnvFiles(srcPath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.createConfig(this.templatesPath, srcPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.createI18n(this.templatesPath, srcPath)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.createConstants(this.templatesPath, srcPath, connectionName)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.createModule(this.templatesPath, srcPath, connectionName, lcModuleName)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.addEntryToAppModule(this.modulePath, moduleName, lcModuleName)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createFolderStructure = function (srcPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_1.default.mkdirSync(path.join(srcPath, 'config'));
                fs_1.default.mkdirSync(path.join(srcPath, 'controllers'));
                fs_1.default.mkdirSync(path.join(srcPath, 'dto'));
                fs_1.default.mkdirSync(path.join(srcPath, 'entities'));
                fs_1.default.mkdirSync(path.join(srcPath, 'i18n'));
                fs_1.default.mkdirSync(path.join(srcPath, 'repository'));
                fs_1.default.mkdirSync(path.join(srcPath, 'services'));
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createEnvFiles = function (srcPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fs_1.default.writeFileSync(path.join(srcPath, '.env'), "\nDB_NAME=\nDB_USER=\nDB_PASS=\nDB_TYPE=mysql\nDB_HOST=localhost\nDB_PORT=3306\nDB_SYNCRONIZE=true\nDB_AUTO_LOAD_ENTITIES=true\nDB_AUTOSCHEMA_SYNC=true\nDB_DROP_SCHEMA=false\nDB_MIGRATION_RUN=true\nDB_LOGGING=false\n    ");
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createConfig = function (templatesPath, srcPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            return __generator(this, function (_a) {
                fileContent = fs_1.default.readFileSync("" + path.join(templatesPath, 'config', 'database.config.template')).toString();
                fs_1.default.writeFileSync(path.join(srcPath, 'config', 'database.config.ts'), fileContent);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createI18n = function (templatesPath, srcPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            return __generator(this, function (_a) {
                fileContent = fs_1.default.readFileSync("" + path.join(templatesPath, 'i18n', 'en.json')).toString();
                fs_1.default.writeFileSync(path.join(srcPath, 'i18n', 'en.json'), fileContent);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createConstants = function (templatesPath, srcPath, connectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            return __generator(this, function (_a) {
                fileContent = fs_1.default.readFileSync("" + path.join(templatesPath, 'constants.enum.template')).toString();
                fileContent = fileContent.replace('{{connectionName}}', connectionName);
                fs_1.default.writeFileSync(path.join(srcPath, 'constants.enum.ts'), fileContent);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.createModule = function (templatesPath, srcPath, moduleName, lcModuleName) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            return __generator(this, function (_a) {
                fileContent = fs_1.default.readFileSync("" + path.join(templatesPath, 'module.template')).toString();
                fileContent = fileContent.replace('{{moduleName}}', moduleName);
                fileContent = fileContent.replace('{{lcModuleName}}', lcModuleName);
                fs_1.default.writeFileSync(path.join(srcPath, lcModuleName + '.module.ts'), fileContent);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.addEntryToAppModule = function (modulePath, moduleName, lcModuleName) {
        return __awaiter(this, void 0, void 0, function () {
            var moduleContent;
            return __generator(this, function (_a) {
                moduleContent = fs_1.default.readFileSync(modulePath).toString();
                moduleContent.replace("/*MODULES*/", "," + moduleName + " /*MODULES*/");
                moduleContent.replace("/*IMPORTS*/", "import { " + moduleName + " } from \"./" + lcModuleName + "/" + lcModuleName + ".module\"; \n/*IMPORTS*/");
                return [2 /*return*/];
            });
        });
    };
    return Main;
}());
exports.Main = Main;
new Main();
