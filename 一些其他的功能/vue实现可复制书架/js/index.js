
require.config({
    paths:{
        'jQuery':'../libs/jquery.min',
        'vue':'../libs/vue',
        'silder':'../libs/wySilder.min'
    },
    shim: {        
        'jQuery': {            
            exports: '$'
        },
        'silder':{
            deps:['jQuery']
        }
    }
})    
// 新版本为vue版本，旧版本为art-template版本
require(['jQuery','vue','silder'],function($,Vue,silder) {
    document.body.style = "zoom:"+(document.body.offsetWidth/1920);
    var vm = new Vue({
        el:'#app',
        data:{
            bookList:BookInfos
        },
        methods:{
            setClass(index){
                var obj = {'bk-cover':true};
                obj[`bk-cover${index}`] = true;
                return obj;
            },
            setBackImg(imgUrl){
                var obj = {
                    backgroundImage:`url(books/covers/${imgUrl})`
                }
                return obj;
            },
            setShelfTop(count) {
                var topValue = 128 + (count - 1) * 240;
                var obj = {
                    top: `${topValue}px`
                }
                return obj;
            },
            booksInit() {
                $( '.bk-cover' ).on( 'click', function() {
                    var $this = $( this );
                    $parent = $this.parent(),
                    $parent.css('z-index', 1000000);
                    $this.animate({
                        left:'30%',
                        top:'10%',
                        height: '720',
                        width: '422'
                    }, "slow", function () {
                        $(location).attr('href', 'index.html?bookIndex=s0001');
                    });    
                } );
            },
            initSilder(){
                $(".container").silder({
                    auto: false,//自动播放，传入任何可以转化为true的值都会自动轮播
                    speed: 20,//轮播图运动速度
                    sideCtrl: true,//是否需要侧边控制按钮
                    bottomCtrl: true,//是否需要底部控制按钮
                    defaultView: 0,//默认显示的索引
                    interval: 3000,//自动轮播的时间，以毫秒为单位，默认3000毫秒
                    activeClass: "active",//小的控制按钮激活的样式，不包括作用两边，默认active
                });
            }
        },
        mounted(){
            this.booksInit();
            this.initSilder();
        }
    });
})
