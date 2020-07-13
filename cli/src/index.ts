import chalk = require("chalk");
import figlet = require("figlet");
import inquirer = require("inquirer");
import * as path from "path";
import { clear } from "console";
import fs from "fs";

export class Main {
  sourcePath = "../../api/src";
  templatesPath = "./templates";
  constructor() {
    this.start();
  }

  start() {
    clear();

    console.log(
      chalk.yellow(figlet.textSync("API Gen", { horizontalLayout: "full" }))
    );

    this.startQuestions();
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  async startQuestions() {
    const answer = await inquirer.prompt([
      { type: "string", message: "Qual o nome do modelo?", name: "className" },
      { type: "string", message: "Qual o nome do módulo?", name: "moduleName" },
    ]);
    if (!answer || !answer.className || !answer.moduleName) {
      console.log("Por favor, os dados precisam ser informados");
      this.startQuestions();
      return;
    }

    answer.className = this.capitalizeFirstLetter(answer.className);

    await this.startProcess(answer);
  }

  async startProcess(answer: { className: string; moduleName: string }) {
    const srcPath = path.join(__dirname, this.sourcePath, answer.moduleName);

    //Verificando se o módulo existe
    if (!fs.existsSync(srcPath)) {
      console.error("O módulo não existe", srcPath);
      return;
    }

    await this.copyToDestination(
      `controllers.template`,
      `${path.join(
        srcPath,
        "controllers",
        answer.className.toLowerCase() + ".controller.ts"
      )}`,
      [
        { key: "{{name}}", value: answer.className },
        { key: "{{lcname}}", value: answer.className.toLowerCase() },
      ]
    );
    await this.copyToDestination(
      `dto.template`,
      `${path.join(
        srcPath,
        "dto",
        answer.className.toLowerCase() + ".dto.ts"
      )}`,
      [
        { key: "{{name}}", value: answer.className },
        { key: "{{lcname}}", value: answer.className.toLowerCase() },
      ]
    );
    await this.copyToDestination(
      `entity.template`,
      `${path.join(
        srcPath,
        "entities",
        answer.className.toLowerCase() + ".entity.ts"
      )}`,
      [
        { key: "{{name}}", value: answer.className },
        { key: "{{lcname}}", value: answer.className.toLowerCase() },
      ]
    );
    await this.copyToDestination(
      `repository.template`,
      `${path.join(
        srcPath,
        "repository",
        answer.className.toLowerCase() + ".repository.ts"
      )}`,
      [
        { key: "{{name}}", value: answer.className },
        { key: "{{lcname}}", value: answer.className.toLowerCase() },
      ]
    );
    await this.copyToDestination(
      `services.template`,
      `${path.join(
        srcPath,
        "services",
        answer.className.toLowerCase() + ".service.ts"
      )}`,
      [
        { key: "{{name}}", value: answer.className },
        { key: "{{lcname}}", value: answer.className.toLowerCase() },
      ]
    );

    await this.addFilesToModule(answer);
    await this.createConstantsEntries(answer);
  }

  async createConstantsEntries(answer: { className: string; moduleName: string }) {
    const moduleSrc = path.join(
      __dirname,
      this.sourcePath,
      answer.moduleName,
      `constants.enum.ts`
    );
    let constantsDescription = fs.readFileSync(moduleSrc).toString();
    //Replacing values case they exist
    constantsDescription = constantsDescription.replace(
      "/*CONSTANTS*/",
      `,${answer.className.toLowerCase()}="${answer.className.toLowerCase()}" \n/*CONSTANTS*/`
    );    
    return fs.writeFileSync(moduleSrc, constantsDescription);
  }

  async addFilesToModule(answer: { className: string; moduleName: string }) {
    const moduleSrc = path.join(
      __dirname,
      this.sourcePath,
      answer.moduleName,
      `${answer.moduleName}.module.ts`
    );
    let moduleDescription = fs.readFileSync(moduleSrc).toString();

    //Replacing values case they exist
    moduleDescription = moduleDescription.replace(
      "/*CONTROLLERS*/",
      `, ${answer.className}Controller /*CONTROLLERS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*PROVIDERS*/",
      `, ${answer.className}Service, ${answer.className}Repository /*PROVIDERS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*FEATURES*/",
      `, ${answer.className}Entity, ${answer.className}Repository /*FEATURES*/`
    );

    //Adicionando os imports
    moduleDescription = moduleDescription.replace(
      "/*IMPORTS*/",
      `/*${answer.className}*/ \n/*IMPORTS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*IMPORTS*/",
      `import { ${
        answer.className
      }Repository } from "./repository/${answer.className.toLowerCase()}.repository"; \n/*IMPORTS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*IMPORTS*/",
      `import { ${
        answer.className
      }Entity } from "./entities/${answer.className.toLowerCase()}.entity"; \n/*IMPORTS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*IMPORTS*/",
      `import { ${
        answer.className
      }Service } from "./services/${answer.className.toLowerCase()}.service"; \n/*IMPORTS*/`
    );
    moduleDescription = moduleDescription.replace(
      "/*IMPORTS*/",
      `import { ${
        answer.className
      }Controller } from "./controllers/${answer.className.toLowerCase()}.controller"; \n/*IMPORTS*/`
    );

    return fs.writeFileSync(moduleSrc, moduleDescription);
  }

  async copyToDestination(
    fileName: string,
    destination: string,
    params: Array<{ key: string; value: string }>
  ) {
    console.debug(
      "Start reading file",
      path.join(__dirname, this.templatesPath, fileName)
    );
    let file = fs
      .readFileSync(path.join(__dirname, this.templatesPath, fileName))
      .toString();
    params.forEach((p) => {
      console.log("Applying param", p.key, p.value);
      file = file.replace(new RegExp(p.key, "g"), p.value);
    });
    console.log("File Updated");
    console.debug("preparing to write on", destination);
    if (!fs.existsSync(destination)){
      fs.writeFileSync(destination, file);
    }else{
      console.log(`File exists, not being overrided`, destination);
    }

  }
}

new Main();
