"use strict";

(function (argument) {
    var progressHalf = new ProgressHalf({
        bar: $(".progress-half.bar")[0],
        num: $(".progress-half.number")[0]
    });

    var progressEasy = new ProgressEasy({
        bar: $(".progress-easy.bar")[0]
    });

    (function testProgressHalf(progressHalf) {
        progressHalf.start();
        setTimeout(function () {
            progressHalf.run("end");
            setTimeout(function () {
                progressHalf.restore();
                setTimeout(function () {
                    testProgressHalf(progressHalf);
                }, 500);
            }, 1000);
        }, 3000);
    })(progressHalf);

    (function testProgressEasy(progressEasy) {
        progressEasy.start();
        setTimeout(function () {
            progressEasy.end();
            setTimeout(function () {
                progressEasy.restore();
                setTimeout(function () {
                    testProgressEasy(progressEasy);
                }, 500);
            }, 1000);
        }, 3000);
    })(progressEasy);
})();