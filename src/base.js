(function (argument) {
    let progressHalf = new ProgressHalf({
        bar:$(".progress-half.bar")[0],
        num:$(".progress-half.number")[0]
    });

    let progressEasy = new ProgressEasy({
        bar:$(".progress-easy.bar")[0],
    });

    (function testProgressHalf (progressHalf){
        progressHalf.start();
        setTimeout(()=>{
            progressHalf.run("end")
            setTimeout(()=>{
                progressHalf.restore();
                setTimeout(()=>{
                    testProgressHalf(progressHalf);
                },500)
            },1000)
        },3000)
    })(progressHalf);
    
    (function testProgressEasy (progressEasy){
        progressEasy.start();
        setTimeout(()=>{
            progressEasy.end();
            setTimeout(()=>{
                progressEasy.restore();
                setTimeout(()=>{
                    testProgressEasy(progressEasy);
                },500)
            },1000)
        },3000)
    })(progressEasy);

})();