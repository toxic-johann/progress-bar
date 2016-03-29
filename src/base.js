(function (argument) {
    let progressHalf = new ProgressHalf({
        bar:$(".progress-half.bar")[0],
        num:$(".progress-half.number")[0]
    });

    (function test (progressHalf){
        progressHalf.start();
        setTimeout(()=>{
            progressHalf.run("end")
            setTimeout(()=>{
                progressHalf.restore();
                setTimeout(()=>{
                    test(progressHalf);
                },500)
            },1000)
        },3000)
    })(progressHalf)
    

})();