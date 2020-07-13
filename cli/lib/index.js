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
        this.templatesPath = "./templates";
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
                            { type: "string", message: "Qual o nome do modelo?", name: "className" },
                            { type: "string", message: "Qual o nome do módulo?", name: "moduleName" },
                        ])];
                    case 1:
                        answer = _a.sent();
                        if (!answer || !answer.className || !answer.moduleName) {
                            console.log("Por favor, os dados precisam ser informados");
                            this.startQuestions();
                            return [2 /*return*/];
                        }
                        answer.className = this.capitalizeFirstLetter(answer.className);
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
            var srcPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcPath = path.join(__dirname, this.sourcePath, answer.moduleName);
                        //Verificando se o módulo existe
                        if (!fs_1.default.existsSync(srcPath)) {
                            console.error("O módulo não existe", srcPath);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.copyToDestination("controllers.template", "" + path.join(srcPath, "controllers", answer.className.toLowerCase() + ".controller.ts"), [
                                { key: "{{name}}", value: answer.className },
                                { key: "{{lcname}}", value: answer.className.toLowerCase() },
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.copyToDestination("dto.template", "" + path.join(srcPath, "dto", answer.className.toLowerCase() + ".dto.ts"), [
                                { key: "{{name}}", value: answer.className },
                                { key: "{{lcname}}", value: answer.className.toLowerCase() },
                            ])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.copyToDestination("entity.template", "" + path.join(srcPath, "entities", answer.className.toLowerCase() + ".entity.ts"), [
                                { key: "{{name}}", value: answer.className },
                                { key: "{{lcname}}", value: answer.className.toLowerCase() },
                            ])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.copyToDestination("repository.template", "" + path.join(srcPath, "repository", answer.className.toLowerCase() + ".repository.ts"), [
                                { key: "{{name}}", value: answer.className },
                                { key: "{{lcname}}", value: answer.className.toLowerCase() },
                            ])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.copyToDestination("services.template", "" + path.join(srcPath, "services", answer.className.toLowerCase() + ".service.ts"), [
                                { key: "{{name}}", value: answer.className },
                                { key: "{{lcname}}", value: answer.className.toLowerCase() },
                            ])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addFilesToModule(answer)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.createConstantsEntries(answer)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createConstantsEntries = function (answer) {
        return __awaiter(this, void 0, void 0, function () {
            var moduleSrc, constantsDescription;
            return __generator(this, function (_a) {
                moduleSrc = path.join(__dirname, this.sourcePath, answer.moduleName, "constants.enum.ts");
                constantsDescription = fs_1.default.readFileSync(moduleSrc).toString();
                //Replacing values case they exist
                constantsDescription = constantsDescription.replace("/*CONSTANTS*/", "," + answer.className.toLowerCase() + "=\"" + answer.className.toLowerCase() + "\" \n/*CONSTANTS*/");
                return [2 /*return*/, fs_1.default.writeFileSync(moduleSrc, constantsDescription)];
            });
        });
    };
    Main.prototype.addFilesToModule = function (answer) {
        return __awaiter(this, void 0, void 0, function () {
            var moduleSrc, moduleDescription;
            return __generator(this, function (_a) {
                moduleSrc = path.join(__dirname, this.sourcePath, answer.moduleName, answer.moduleName + ".module.ts");
                moduleDescription = fs_1.default.readFileSync(moduleSrc).toString();
                //Replacing values case they exist
                moduleDescription = moduleDescription.replace("/*CONTROLLERS*/", ", " + answer.className + "Controller /*CONTROLLERS*/");
                moduleDescription = moduleDescription.replace("/*PROVIDERS*/", ", " + answer.className + "Service, " + answer.className + "Repository /*PROVIDERS*/");
                moduleDescription = moduleDescription.replace("/*FEATURES*/", ", " + answer.className + "Entity, " + answer.className + "Repository /*FEATURES*/");
                //Adicionando os imports
                moduleDescription = moduleDescription.replace("/*IMPORTS*/", "/*" + answer.className + "*/ \n/*IMPORTS*/");
                moduleDescription = moduleDescription.replace("/*IMPORTS*/", "import { " + answer.className + "Repository } from \"./repository/" + answer.className.toLowerCase() + ".repository\"; \n/*IMPORTS*/");
                moduleDescription = moduleDescription.replace("/*IMPORTS*/", "import { " + answer.className + "Entity } from \"./entities/" + answer.className.toLowerCase() + ".entity\"; \n/*IMPORTS*/");
                moduleDescription = moduleDescription.replace("/*IMPORTS*/", "import { " + answer.className + "Service } from \"./services/" + answer.className.toLowerCase() + ".service\"; \n/*IMPORTS*/");
                moduleDescription = moduleDescription.replace("/*IMPORTS*/", "import { " + answer.className + "Controller } from \"./controllers/" + answer.className.toLowerCase() + ".controller\"; \n/*IMPORTS*/");
                return [2 /*return*/, fs_1.default.writeFileSync(moduleSrc, moduleDescription)];
            });
        });
    };
    Main.prototype.copyToDestination = function (fileName, destination, params) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                console.debug("Start reading file", path.join(__dirname, this.templatesPath, fileName));
                file = fs_1.default
                    .readFileSync(path.join(__dirname, this.templatesPath, fileName))
                    .toString();
                params.forEach(function (p) {
                    console.log("Applying param", p.key, p.value);
                    file = file.replace(new RegExp(p.key, "g"), p.value);
                });
                console.log("File Updated");
                console.debug("preparing to write on", destination);
                if (!fs_1.default.existsSync(destination)) {
                    fs_1.default.writeFileSync(destination, file);
                }
                else {
                    console.log("File exists, not being overrided", destination);
                }
                return [2 /*return*/];
            });
        });
    };
    return Main;
}());
exports.Main = Main;
new Main();
