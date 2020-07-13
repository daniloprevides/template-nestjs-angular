export declare class Main {
    sourcePath: string;
    modulePath: string;
    templatesPath: string;
    constructor();
    start(): void;
    capitalizeFirstLetter(value: string): string;
    startQuestions(): Promise<void>;
    startProcess(answer: {
        moduleName: string;
    }): Promise<void>;
    createFolderStructure(srcPath: string): Promise<void>;
    createEnvFiles(srcPath: string): Promise<void>;
    createConfig(templatesPath: string, srcPath: string): Promise<void>;
    createI18n(templatesPath: string, srcPath: string): Promise<void>;
    createConstants(templatesPath: string, srcPath: string, connectionName: string): Promise<void>;
    createModule(templatesPath: string, srcPath: string, moduleName: string, lcModuleName: string): Promise<void>;
    addEntryToAppModule(modulePath: string, moduleName: string, lcModuleName: string): Promise<void>;
}
