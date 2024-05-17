export default class WebLogger {
    static LogMethods: ['info', 'trace', 'warn', 'error'] = ['info', 'trace', 'warn', 'error']
    currentLevel!: string | number
    storageKey?: string = 'WebLogger'
    name: string
    defaultLevel: string
    levels: Record<string, number>
    constructor(name: string, defaultLevel: string) {
        this.defaultLevel = defaultLevel == null ? 'WARN' : defaultLevel
        this.name = name
        if (typeof name === 'string') {
            this.storageKey += ':' + name
        } else if (typeof name === 'symbol') {
            this.storageKey = void 0
        }

        this.levels = {
            'TRACE': 0,
            'DEBUG': 1,
            'INFO': 2,
            'WARN': 3,
            'ERROR': 4,
            'SILENT': 5
        }

        this.setLevel(defaultLevel);
    }

    bindMethod(obj: Record<any, any>, methodName: string) {
        const method = obj[methodName]
        if (typeof method.bind === 'function') {
            return method.bind(obj)
        } else {
            return Function.prototype.bind.call(method, obj)
        }
    }

    realMethod(methodName: 'info' | 'trace' | 'warn' | 'error') {
        if (typeof window.console === 'undefined') {
            return false
        } else if (window.console[methodName] !== undefined) {
            return this.bindMethod(window.console, methodName);
        } else if (window.console.log !== undefined) {
            return this.bindMethod(window.console, 'log')
        } else {
            return () => void 0
        }
    }

    getLevel() {
        return this.currentLevel
    }

    setLevel(_level: string) {
        const level = (typeof _level === 'string' && this.levels[_level.toUpperCase()]) ?? _level

        if (typeof level === 'number' && level >= 0 && level <= this.levels.SILENT) {
            this.currentLevel = level;
            if (typeof console === 'undefined' && level < this.levels.SILENT) {
                return 'No console available for logging';
            }
        } else {
            throw 'log.setLevel() called with invalid level: ' + level
        }
    }

    setDefaultLevel(level: string) {
        this.defaultLevel = level
    }

    resetLevel() {
        this.setLevel(this.defaultLevel)
    }
}
