require.config({
    paths: {
        "base": '/dist/base',
        "jquery": "//cdn.bootcss.com/jquery/2.2.1/jquery.min",
        "progressHalf":"/dist/progress-half.widget",
        "progressEasy":"/dist/progress-easy.widget",
    }
});

require(['jquery'],function(){
    console.log('jquery finish loading');
    require(['progressHalf','progressEasy'], function(ProgressHalf,ProgressEasy) {
        window.ProgressHalf = ProgressHalf;
        window.ProgressEasy = ProgressEasy;
        console.log('progess finish loading');
        require(['base'],function(){
            console.log('base finish loading');
        });
    });
});