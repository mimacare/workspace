// 下拉加载功能 依赖idangerous.swiper.min.js，jquery.js
var botPosition, scrBotPosition= 0;
// 下拉加载
function swiper(){
    mySwiper = new Swiper('.swiper-container:visible', {
        slidesPerView: 'auto',
        mode: 'vertical',
        watchActiveIndex: true,
        preventLinks:true,
        onResistanceAfter: function(s, pos) {
            botPosition = pos;
        },
        onTouchEnd: function() {
            touchEnd();
        }
    });
}
//拖拽释放
function touchEnd(){
    var v = -mySwiper.getWrapperTranslate('y'); //向上偏移
    var a = $('.swiper-container:visible').outerHeight(true); //窗口高度
    var sum = $('.swiper-wrapper:visible').outerHeight(true); //文档高度
    // 判断文档是否满屏
    if($('.swiper-wrapper:visible').outerHeight()>$('.swiper-container:visible').outerHeight()){
        scrBotPosition = sum-a;
        console.log(v);
        if ((v + a >= sum) ? true: false) {//判断是否到底了??????
            if (mySwiper.touches.diff<=0 && botPosition > 80) {// 向上拖动且回弹>100
                mySwiper.setWrapperTranslate(0, -scrBotPosition-40, 0);
                mySwiper.params.onlyExternal = false;
                mySwiper.appendSlide('<img src="css/images/loading.png"><span class="txt">正在加载</span>', 'preloader', 'div');
                loadBotSlides();
            }
        }else{
            mySwiper.setWrapperTranslate(0, -scrBotPosition, 0);
        }
    }else{//不满首屏
        if (mySwiper.touches.diff<=0 && botPosition > 80) {// 向上拖动且回弹>100
            mySwiper.setWrapperTranslate(0, -40, 0);
            mySwiper.params.onlyExternal = false;
            mySwiper.appendSlide('<img src="css/images/loading.png"><span class="txt">正在加载</span>', 'preloader', 'div');
            loadBotSlides();
        }
    }
	
}
// 加载效果
function loadBotSlides() {
    setTimeout(function() {
        var innerhtml = ajaxLoad();
        // 是否超出首屏
        var full = $('.swiper-wrapper:visible').outerHeight()>$('.swiper-container:visible').outerHeight()?true:false;
        if (innerhtml) {
            var newSlide = mySwiper.createSlide(innerhtml);
            $(".preloader").remove(); //隐藏tips
            newSlide.append(); //添加片段
            console.log('成功添加了数据');
        }else{
            $(".preloader").html('加载失败').delay(500).queue(function (){
                $(".preloader").remove();
            });
            setTimeout(function(){
                if(full){
                    mySwiper.setWrapperTranslate(0, -scrBotPosition, 0);
                }
            },500) //归位文档偏移
        }
        mySwiper.params.onlyExternal = false; //slides继续滑动
    },
    500)
}
// 加载外部数据（暂用html格式，可用xml或json格式）
function ajaxLoad() {
    var txt = "";
    $.ajax({
        type: 'POST',
        url: 'data.html',
        async: false,
        dataType: "html",
        success: function(responseTxt) {
            txt = responseTxt;
        },
        error: function() {
            txt = '';
        }
    });
    return txt;
}