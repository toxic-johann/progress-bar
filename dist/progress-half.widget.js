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
        root.ProgressHalf = factory(root.jQuery);
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
            waitingTime: 1000,
            waitingClass: "waiting",
            finishClass: "finish",
            accuracy: 0.9,
            controlNum: true,
            // 外层实际宽度
            widthLimit: 100
        }, opt);
        this.bar = opt.bar;
        this.progress = 100;
        this.runningId = "";
        if (this.info.controlNum) {
            this.num = opt.num;
            this.numberId = "";
        }
        return this;
    };
    $.extend(ProgressBar.prototype, {
        start: function start() {
            var self = this;
            $(self.bar).addClass(self.info.waitingClass);
            self.run();
            if (self.info.controlNum && self.num) {
                self.detectNum();
            }
            self.on("paused", function () {
                self.detectNum("pause");
            });
        },
        run: function run(order) {
            var self = this;
            if (!order) {
                if (self.progress < self.info.accuracy) {
                    self.pause = true;
                    self.run('pause');
                    return;
                }
                self.progress = 0.5 * self.progress;
            } else if (order == "end") {
                self.progress = 0;
                clearTimeout(self.runningId);
                $(self.bar).addClass(self.info.finishClass);
                self.runningId = null;
                if (!self.info.controlNum || !self.num) {
                    setTimeout(function () {
                        self.trigger("ended");
                    }, self.info.finishTime);
                } else {
                    self.detectNum();
                }
            } else if (order == "pause") {
                clearTimeout(self.runningId);
                self.runningId = null;
                self.trigger("paused");
                return;
            }
            $(self.bar).css("width", 100 - self.progress + "%");
            if (!order) {
                self.runningId = setTimeout(function () {
                    self.run();
                }, self.info.waitingTime);
            }
        },
        detectNum: function detectNum(order) {
            var self = this;
            var width = $(self.bar).width();
            if (width >= self.info.widthLimit) {
                $(self.num).text("100%");
                self.trigger("ended");
                return;
            } else if (order == "pause") {
                clearTimeout(self.numberId);
                return;
            }
            var num = ~ ~(parseFloat(width) / self.info.widthLimit / self.info.accuracy) * self.info.accuracy;
            $(self.num).text(width + "%");
            self.numberId = setTimeout(function () {
                self.detectNum();
            }, 16);
        },
        restore: function restore() {
            var self = this;
            clearTimeout(self.runningId);
            clearTimeout(self.numberId);
            $(self.bar).removeClass(self.info.waitingClass);
            $(self.bar).removeClass(self.info.finishClass);
            $(self.bar).css("width", "0%");
            $(self.num).text("0%");
            self.progress = 100;
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