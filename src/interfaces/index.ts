interface ProgramOptions {
    [key: string]: boolean | number | string;
}

export interface IResize {
    resize(width: number, height: number): void;
}

export interface IProgram {
    getProgramOptions(): ProgramOptions;
}
