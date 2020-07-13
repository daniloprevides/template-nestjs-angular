export declare class Main {
    sourcePath: string;
    templatesPath: string;
    constructor();
    start(): void;
    capitalizeFirstLetter(value: string): string;
    startQuestions(): Promise<void>;
    startProcess(answer: {
        className: string;
        moduleName: string;
    }): Promise<void>;
    createConstantsEntries(answer: {
        className: string;
        moduleName: string;
    }): Promise<void>;
    addFilesToModule(answer: {
        className: string;
        moduleName: string;
    }): Promise<void>;
    copyToDestination(fileName: string, destination: string, params: Array<{
        key: string;
        value: string;
    }>): Promise<void>;
}
