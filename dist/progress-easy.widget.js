'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(["jquery"], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require("jquery"));
    } else {
        // 浏览器全局变量(root 即 window)
        root = root || window;
        root.ProgressEasy = factory(root.jQuery);
    }
})(undefined, function () {
    'use strict';

    function ProgressBar(opt) {
        this._events = $({});
        if (!opt) {
            throw new Error("需要传入初始参数");
            return;
        }
        if (!opt.bar) {
            throw new Error("需要设置初始进度条");
            return;
        }
        this.info = $.extend({
            // 最终结束时间，单位是毫秒
            finishTime: 100,
            // 单次完成循环时间，单位是毫秒
            waitingClass: "slow waiting",
            finishClass: "fast finish"
        }, // 外层实际宽度
        opt);
        this.bar = opt.bar;
        this.runningId = "";
        return this;
    };
    $.extend(ProgressBar.prototype, {
        start: function start() {
            var self = this;
            $(self.bar).addClass(self.info.waitingClass);
        },
        end: function end() {
            var self = this;
            $(self.bar).addClass(self.info.finishClass);
            setTimeout(function () {
                self.trigger("ended");
            }, self.info.finishTime);
        },
        restore: function restore() {
            var self = this;
            clearTimeout(self.runningId);
            $(self.bar).removeClass(self.info.waitingClass);
            $(self.bar).removeClass(self.info.finishClass);
        },
        on: function on() {
            this._events.on.apply(this._events, arguments);
        },

        off: function off() {
            this._events.off.apply(this._events, arguments);
        },

        trigger: function trigger() {
            this._events.trigger.apply(this._events, arguments);
        }
    });
    // 暴露公共方法
    return ProgressBar;
});