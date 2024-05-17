export default class WebLogger {
    static LogMethods: ['info', 'trace', 'warn', 'error'];
    currentLevel: string | number;
    storageKey?: string;
    name: string;
    defaultLevel: string;
    levels: Record<string, number>;
    constructor(name: string, defaultLevel: string);
    bindMethod(obj: Record<any, any>, methodName: string): any;
    realMethod(methodName: 'info' | 'trace' | 'warn' | 'error'): any;
    getLevel(): string | number;
    setLevel(_level: string): "No console available for logging" | undefined;
    setDefaultLevel(level: string): void;
    resetLevel(): void;
}
