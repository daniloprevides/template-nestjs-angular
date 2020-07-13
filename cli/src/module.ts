import chalk = require("chalk");
import figlet = require("figlet");
import inquirer = require("inquirer");
import * as path from "path";
import { clear } from "console";
import fs from "fs";

export class Main {
  sourcePath = "../../api/src";
  modulePath = "../../api/src/app.module.ts";
  templatesPath = "./templates/module";
  constructor() {
    this.start();
  }

  start() {
    clear();

    console.log(
      chalk.yellow(figlet.textSync("Módule Gen", { horizontalLayout: "full" }))
    );

    this.startQuestions();
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  async startQuestions() {
    const answer = await inquirer.prompt([
      { type: "string", message: "Qual o nome do módulo?", name: "moduleName" },
    ]);
    if (!answer || !answer.moduleName) {
      console.log("Por favor, os dados precisam ser informados");
      this.startQuestions();
      return;
    }

    await this.startProcess(answer);
  }

  async startProcess(answer: { moduleName: string }) {    
    const srcPath = path.join(__dirname, this.sourcePath, answer.moduleName);
    const moduleAsClassName = this.capitalizeFirstLetter(answer.moduleName.toLocaleLowerCase());
    const connectionName = `${moduleAsClassName}Module`;
    const moduleName = connectionName;
    const lcModuleName = answer.moduleName.toLowerCase();


    //Verificando se o módulo existe
    if (fs.existsSync(srcPath)) {
      console.error("O módulo existe", srcPath);
      return;
    }else{
      fs.mkdirSync(srcPath);
    }

    await this.createFolderStructure(srcPath);
    await this.createEnvFiles(srcPath);
    await this.createConfig(this.templatesPath,srcPath);
    await this.createI18n(this.templatesPath,srcPath);
    await this.createConstants(this.templatesPath,srcPath, connectionName);
    await this.createModule(this.templatesPath,srcPath, connectionName, lcModuleName);
    await this.addEntryToAppModule(this.modulePath, moduleName, lcModuleName);

    console.debug('Module created successfully');
    process.exit(0);
  }


  async createFolderStructure(srcPath:string){
    fs.mkdirSync(path.join(srcPath,'config'));
    fs.mkdirSync(path.join(srcPath,'controllers'));
    fs.mkdirSync(path.join(srcPath,'dto'));
    fs.mkdirSync(path.join(srcPath,'entities'));
    fs.mkdirSync(path.join(srcPath,'i18n'));
    fs.mkdirSync(path.join(srcPath,'repository'));
    fs.mkdirSync(path.join(srcPath,'services'));    
  }

  async createEnvFiles(srcPath:string){
    fs.writeFileSync(path.join(srcPath,'.env'),`
DB_NAME=
DB_USER=
DB_PASS=
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_SYNCRONIZE=true
DB_AUTO_LOAD_ENTITIES=true
DB_AUTOSCHEMA_SYNC=true
DB_DROP_SCHEMA=false
DB_MIGRATION_RUN=true
DB_LOGGING=false
    `);
  }


  async createConfig(templatesPath:string,srcPath:string){
    let fileContent = fs.readFileSync(`${path.join(__dirname,templatesPath,'config','database.config.template')}`).toString();
    fs.writeFileSync(path.join(srcPath,'config','database.config.ts'), fileContent);
  }

  async createI18n(templatesPath:string,srcPath:string){
    let fileContent = fs.readFileSync(`${path.join(__dirname,templatesPath,'i18n','en.json')}`).toString();
    fs.writeFileSync(path.join(srcPath,'i18n','en.json'), fileContent);
  }

  async createConstants(templatesPath:string,srcPath:string, connectionName:string){
    let fileContent = fs.readFileSync(`${path.join(__dirname,templatesPath,'constants.enum.template')}`).toString();
    fileContent = fileContent.replace('{{connectionName}}',connectionName);
    fs.writeFileSync(path.join(srcPath,'constants.enum.ts'), fileContent);
  }

  async createModule(templatesPath:string,srcPath:string, moduleName:string, lcModuleName:string){
    let fileContent = fs.readFileSync(`${path.join(__dirname,templatesPath,'module.template')}`).toString();
    fileContent = fileContent.replace('{{moduleName}}',moduleName);
    fileContent = fileContent.replace('{{lcModuleName}}',lcModuleName);
    fileContent = fileContent.replace('{{lcModuleName}}',lcModuleName);
    fs.writeFileSync(path.join(srcPath,lcModuleName+'.module.ts'), fileContent);
  }

  async addEntryToAppModule(modulePath:string, moduleName:string, lcModuleName:string){
    let moduleContent = fs.readFileSync(path.join(__dirname,modulePath)).toString();
    moduleContent = moduleContent.replace(
      "/*MODULES*/",
      `,${moduleName} /*MODULES*/`
    );    
    moduleContent = moduleContent.replace(
      "/*IMPORTS*/",
      `import { ${
        moduleName
      } } from "./${lcModuleName}/${lcModuleName}.module";\n/*IMPORTS*/`
    );    
    fs.writeFileSync(path.join(__dirname,modulePath), moduleContent);


  }
  

}

new Main();
