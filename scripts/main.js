require.config({
    paths: {
        "base": '/dist/base',
        "jquery": "//cdn.bootcss.com/jquery/2.2.1/jquery.min",
        "progessHalf":"/dist/progress-half.widget"
    }
});

require(['jquery'],function(){
    console.log('jquery finish loading');
    require(['progessHalf'], function(ProgressHalf) {
        window.ProgressHalf = ProgressHalf;
        console.log('progessHalf finish loading');
        require(['base'],function(){
            console.log('base finish loading');
        });
    });
});