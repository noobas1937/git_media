$(function() {
    /*$(".pc-qianbi").click(function() {
        $(".pc-qianbi").css("background-image", "url('/Public/Home/static/img/pc-qianbi2.png')");
        $(".pc-qianbi").text("已签");
        $(".alert").show();
        $(".pc-tablealertcontent").show();
    })

    $(".tr>section").click(function() {
        // $("section[data='19']").click(function() {
        if ($(this).prev().attr("class")) {
            if ($(this).prev().attr("class") == "secactiveright") {
                $(this).prev().removeClass("secactiveright");
                $(this).prev().addClass("secactive");
                if ($(this).next().attr("class")) {
                    if ($(this).next().attr("class") == "secactiveleft") {
                        $(this).next().removeClass("secactiveleft");
                        $(this).next().addClass("secactive");
                        $(this).addClass("secactive");
                    } else {
                        $(this).next().removeClass("secactivecir");
                        $(this).next().addClass("secactiveright");
                        $(this).addClass("secactive");
                    }
                } else {
                    $(this).addClass("secactiveright");
                }
            } else {
                $(this).prev().removeClass("secactivecir");
                $(this).prev().addClass("secactiveleft");
                if ($(this).next().attr("class")) {
                    $(this).addClass("secactive");
                    if ($(this).next().attr("class") == "secactiveleft") {
                        $(this).next().removeClass("secactiveleft")
                        $(this).next().addClass("secactive")
                    } else {
                        $(this).next().removeClass("secactivecir")
                        $(this).next().addClass("secactiveright")
                    }
                } else {
                    $(this).addClass("secactiveright")
                }

            }
        } else {
            if ($(this).next().attr("class")) {
                $(this).addClass("secactiveleft")
                if ($(this).next().attr("class") == "secactiveleft") {
                    $(this).next().removeClass("secactiveleft")
                    $(this).next().addClass("secactive")
                } else {
                    $(this).next().removeClass("secactivecir")
                    $(this).next().addClass("secactiveright")
                }
            } else {
                $(this).addClass("secactivecir")
            }
        }
    })*/

    /**
     * 签到按钮
     */
    $('#daily_sign').click(function () {
        var url = '/Home/User/ajax_daily_sign.html';
        $.ajax({
            type: 'GET',
            url: url ,
            dataType:'json',
            data:{},
            async : false, //默认为true 异步
            success:function(res) {
                if(res.error){
                    dialogInfo(res.detail);
                }else{
                    var signDayInfo = res.data;
                    var currentMonth = signDayInfo.current_month;
                    var weekDayHtml = '';
                    if(currentMonth.length > 0){
                        for(var week = 0; week < currentMonth.length; week++){
                            var weekData = currentMonth[week];
                            weekDayHtml += '<div class="tr">';
                            for(var day = 0; day < weekData.length; day++){
                                var dayData = weekData[day];
                                var isSignClass = '';
                                if(weekData[day].is_sign == 1){
                                    isSignClass = 'secactive';
                                }
                                weekDayHtml +=
                                    '<section class="'+isSignClass+'"><span>'+ dayData.day +'</span></section>';

                            }
                            weekDayHtml += '</div>';
                        }
                    }
                    var html = '';
                    html +=
                        '<div class="pc-tablealertcontent">' +
                        '<div class="pc-tablealert">' +
                        '<div class="pc-tablealert-up">' +
                        '<span class="taltyear">' + signDayInfo.today.year + '</span>年<span class="taltmonth">' + signDayInfo.today.month + '</span>月' +
                        '<section class="talticonleft"></section>' +
                        '<section class="talticonright"></section>' +
                        '</div>' +
                        '<div class="pc-tablealert-down">' +
                        '<table class="pc-tablealert1" cellspacing="0">' +
                        '<caption style="color:#989898;font-size:16px;margin:15px 0;">连续签到<span class="taltday">' + signDayInfo.sign_num + '</span>天</caption>' +
                        '<thead>' +
                        '<tr>' +
                        '<td>日</td>' +
                        '<td>一</td>' +
                        '<td>二</td>' +
                        '<td>三</td>' +
                        '<td>四</td>' +
                        '<td>五</td>' +
                        '<td>六</td>' +
                        '</tr>' +
                        '</thead>' +
                        '</table>' +
                        '<div class="table">' +
                        weekDayHtml +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('body').append(html);
                    $(".alert").show();
                    $('.pc-tablealertcontent').show();
                    $(".pc-qianbi").css("background-image", "url('/Public/Home/static/img/pc-qianbi2.png')");
                    $(".pc-qianbi").text("已签");
                    $(".alert").click(function() {
                        $(".alert").hide();
                        $('.pc-tablealertcontent').remove();
                    })
                }
            },
            error : function() {
                dialogInfo('未知错误','', 1, true);
            }
        });

    });

});
/**
 * 个人中心消息弹窗
 * @param message 主提示信息
 * @param tips 副提示信息
 * @param type 1正常 2警告 3错误
 * @param isReload 是否刷新
 */
function dialogInfo(message, tips, type, isReload) {
    if(typeof (tips) === 'undefined'){
        tips = '';
    }
    if(typeof (isReload) === 'undefined'){
        isReload = false;
    }
    var html =
        '<div class="pc-setcommonalert" style="display: block;">'+
        '<div class="pc-alertty">'+
        '<div class="closealert"></div>'+
        '<div></div>'+
        message + '<br>'+
        '<p>'+tips+'</p>'+
        '<div class="closealert">我知道了</div>'+
        '</div>'+
        '</div>';
    $(".alert").show();
    $('body').append(html);
    $(".closealert, .alert").click(function() {
        $(this).parents().find('.pc-setcommonalert').remove();
        $(".alert").hide();
        if(isReload){
            window.location.reload();
        }
    })
}