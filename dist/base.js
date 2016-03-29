"use strict";

(function (argument) {
    var progressHalf = new ProgressHalf({
        bar: $(".progress-half.bar")[0],
        num: $(".progress-half.number")[0]
    });

    (function test(progressHalf) {
        progressHalf.start();
        setTimeout(function () {
            progressHalf.run("end");
            setTimeout(function () {
                progressHalf.restore();
                setTimeout(function () {
                    test(progressHalf);
                }, 500);
            }, 1000);
        }, 3000);
    })(progressHalf);
})();