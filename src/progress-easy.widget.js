(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(["jquery"], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require("jquery"));
    } else {
        // 浏览器全局变量(root 即 window)
        root = root || window;
        root.ProgressEasy = factory(root.jQuery);
    }
}(this, function () {
    'use strict'

    function ProgressBar (opt) {
        this._events = $({});
        if(!opt){
            throw new Error("需要传入初始参数");
            return;
        }
        if(!opt.bar){
            throw new Error("需要设置初始进度条");
            return;
        }
        this.info = $.extend({
            // 最终结束时间，单位是毫秒
            finishTime:100,
            // 单次完成循环时间，单位是毫秒
            waitingClass:"slow waiting",
            finishClass:"fast finish",
            // 外层实际宽度
        },opt);
        this.bar = opt.bar;
        this.runningId = "";
        return this;
    };
    $.extend(ProgressBar.prototype, {
        start: function() {
            let self=this;
            $(self.bar).addClass(self.info.waitingClass);
        },
        end:function(){
            let self = this;
            $(self.bar).addClass(self.info.finishClass);
            setTimeout(function(){
                self.trigger("ended");
            },self.info.finishTime);
        },
        restore:function(){
            let self=this;
            clearTimeout(self.runningId);
            $(self.bar).removeClass(self.info.waitingClass)
            $(self.bar).removeClass(self.info.finishClass);
        },
        on: function() {
            this._events.on.apply(this._events, arguments);
        },

        off: function() {
            this._events.off.apply(this._events, arguments);
        },

        trigger: function() {
            this._events.trigger.apply(this._events, arguments);
        }
    });
    // 暴露公共方法
    return ProgressBar;
}));