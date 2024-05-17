!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).WebLogger = {}))
})(this, function (e) {
  'use strict'
  var t = (function () {
    function e(e, t) {
      ;(this.storageKey = 'WebLogger'),
        (this.defaultLevel = null == t ? 'WARN' : t),
        (this.name = e),
        'string' == typeof e
          ? (this.storageKey += ':' + e)
          : 'symbol' == typeof e && (this.storageKey = void 0),
        (this.levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 }),
        this.setLevel(t)
    }
    return (
      (e.prototype.bindMethod = function (e, t) {
        var o = e[t]
        return 'function' == typeof o.bind ? o.bind(e) : Function.prototype.bind.call(o, e)
      }),
      (e.prototype.realMethod = function (e) {
        return (
          void 0 !== window.console &&
          (void 0 !== window.console[e]
            ? this.bindMethod(window.console, e)
            : void 0 !== window.console.log
            ? this.bindMethod(window.console, 'log')
            : function () {})
        )
      }),
      (e.prototype.getLevel = function () {
        return this.currentLevel
      }),
      (e.prototype.setLevel = function (e) {
        var t,
          o =
            null !== (t = 'string' == typeof e && this.levels[e.toUpperCase()]) && void 0 !== t
              ? t
              : e
        if (!('number' == typeof o && o >= 0 && o <= this.levels.SILENT))
          throw 'log.setLevel() called with invalid level: ' + o
        if (((this.currentLevel = o), 'undefined' == typeof console && o < this.levels.SILENT))
          return 'No console available for logging'
      }),
      (e.prototype.setDefaultLevel = function (e) {
        this.defaultLevel = e
      }),
      (e.prototype.resetLevel = function () {
        this.setLevel(this.defaultLevel)
      }),
      (e.LogMethods = ['info', 'trace', 'warn', 'error']),
      e
    )
  })()
  ;(e.default = t), Object.defineProperty(e, '__esModule', { value: !0 })
})
