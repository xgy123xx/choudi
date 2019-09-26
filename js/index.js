/**
 * Created by 徐光宇 on 2018/8/3.
 */
$(".list-group-item").attr("commentFloor",0);  //给初始帖子一个楼层属性

//内容部分导航条按钮
$("#nav-left").children(".btn").click(function () {
    $(this).addClass("active").siblings("a").removeClass("active");
});
//导航
function KeepTwo(s){
    return s > 10? s :"0"+s ;
}
setInterval(function () {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth();
    var day = myDate.getDay();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    var timeContent = year+"年"+month+"月"+day+"日"+" "+hours+":"+minutes+":"+KeepTwo(seconds);
    $("#current-time").text(timeContent);
},1000);
//登录模态框下一步按键
$("#register-next").click(function () {
   $("#write-phone").css("display","none");
   $("#fill-info").css("display","block");
});

//评论功能模块
$('.closeComment').click(function(){
    $(this).parents('div.comment').slideUp();
});

$('.toggleComment').click(function(){
    $(this).parents("div.row").next().children("div.comment").slideToggle();
});

//    点赞按钮
$(".goodJob").click(function () {
    var bCount = $(this).parent().siblings("h4.list-group-item-heading").children("b");
    bCount.text(Number(bCount.text())+1);
});

//  评论区域
//发送标签
$('.send-msg').click(function () {
    //        取出输入框中的内容
    var msg = $(this).parent().prev().val();
//        判断输入框是否为空
    if(msg.length == 0) {
        alert('输入框不能为空');
    }
    else{
        $(this).parent().prev().val("");
//       append进ul中，创建好li标签
        console.log($(this).parents(".list-group-item").attr("commentFloor")) ;
        var count = $(this).parents(".list-group-item").attr("commentFloor");
        $(this).parents(".list-group-item").attr("commentFloor",++count);
        var content = count+"楼："+msg;
        var liStr ="<li>"+ content+"<span class='close'>x</span></li>";
        var commentList = $(this).parent().siblings('.comment-list');
        commentList.append(liStr);
    }
//    创建标签的时候就要将删除标签写好
    $(commentList).children('li:last').children('.close').click(function () {
        //this = 删除的span标签
        $(this).parent().remove();
    })

});
//取消标签
//给跳出模态框的按钮设置一个属性，为了清空操作
$('.cancel-msg').click(function () {
    //里面加入一个模态框，先判断是否有内容在，有内容，跳出模态框是否删除内容
    if($(this).parent().prev().val() == "")
    {
        $(this).parent().parent().slideUp();
    }
    else{
        //让用户选择是否清空内容
        $(this).parent().prev().attr("isShowModal","true");
        $("#myModal").modal();

    }
});
//清空模态框中的内容
$("#clearContent").click(function () {
    //删除当前输入框中的内容
    $("#myModal").modal('hide');
    //这要有选择的清除
    $("textarea[isShowModal=true]").val("").parent().slideUp();
    $("textarea[isShowModal=true]").removeAttr("isShowModal");
});

//对右边广告实现滚动监听
$(document).bind("scroll",adScroll);

var isUp = false;//用来判断广告是否悬浮
var timer = null;//用来存储定时器变量
function adScroll() {
    var domTop = $(document).scrollTop();
    if(domTop <= 300){
        if(!isUp)
        {
            $("#ad").css({"display":"none"});
            $("#ad").slideDown(1000);
            adTimer();
            isUp = true;
        }
        $("#ad").css({"position":"fixed","bottom":"0","right":0});
        $("#timer-content").css({"display":"block"});

        //$("#ad").append()
    }else{
        if(isUp){
            clearInterval(timer);
            $("#ad").css({"display":"none"});
            $("#ad").slideDown(1000);
            isUp = false;
        }
        $("#ad").css({"position":"static"});
        $("#timer-content").css({"display":"none"});
    }
    //对左侧返回上一层按钮实现滚动监听
    if(domTop >= 70){
        $("#return-top a:first").css("display","block");
        $("#return-top a:last").css("display","none");
    }else{
        $("#return-top a:first").css("display","none");
        $("#return-top a:last").css("display","block");
    }

}


//写一个关闭按钮定时器
function adTimer(){
    var adTm = 5;
    timer = setInterval(function () {
        $("#timer-content").children("span").text(adTm);
        if(adTm == 0){
            clearInterval(timer);
            $("#ad-time").text("x").css({"cursor":"pointer"}).click(function () {
                //    关闭操作1.向下滑动 关闭，2.解绑滑动监听事件
                $("#ad").slideDown(1000);
                $("#ad").css({"position":"static"});
                $("#timer-content").css({"display":"none"});
                $(document).unbind("scroll");
            });
        }
        adTm--;
    },1000)
}

//写一个手机登录和用户登录切换
//这里为什么不直接设置所有的按钮单击事件？是因为我要拿到索引，找到相应的盒子 -> ->
var btnGroup = $("#login-header").children("a");
var formGroup = $("#login").children("form");
for(var i = 0;i < btnGroup.length;i++){
    btnGroup[i].index = i;
}
btnGroup.click(function () {
    formGroup.eq(this.index).addClass("active");
    formGroup.eq(this.index).siblings("form").removeClass("active");
});

//关闭按钮
$("#mymodel-header").children("span").last().click(function () {

    $("#makeGrayScreen").css({"display":"none"});
});
$("#my-navbar-right").click(function () {
    $("#makeGrayScreen").css({"display":"block"});
});

//对输入框进行处理
$("#postBtn").click(function () {
    $("#postEssay").slideDown(1000);
});

$("#postCancel").click(function () {
    var title = $("#essayTitle");
    var content = $("#essayContent");
    if(title.val().length||content.val().length){
        //    弹出模态框，提示用户是否删除
        $("#myModal2").modal();

    }else{
        $("#postEssay").slideUp(1000);
    }
});
//清空发帖中的内容
$("#clearEssay").click(function () {
    //删除当前输入框中的内容
    $("#myModal2").modal('hide');
    $("#essayContent").val("");
    $("#essayTitle").val("");
    $("#postEssay").slideUp(1000);
});
//发帖按钮
$("#send").click(function () {
    //获取titile，content，这两项都不能为空   var title = $("#essayTitle");
    var title = $("#essayTitle");
    var content = $("#essayContent");
    if(!title.val().length||!content.val().length){
        //   当有一项为空时，可以下拉式警告框
        alert("标题或内容不能为空")
    }
    else{
        //    添加到正文标签中
        //创建一个帖子

        var newTemp = $('#new-temper').clone(true);
        newTemp.removeAttr("id");
        newTemp.attr("commentFloor",0); //这个属性用来记录评论楼层的
        newTemp.css({display:"block"});
        newTemp.find("h4>a").text(title.val());
        newTemp.find("h4+p").text(content.val());
        newTemp.prependTo("#my-list");
        //清空内容并隐藏发帖框
        title.val("");
        content.val("");
        $("#postEssay").slideUp(1000);
    }


});
