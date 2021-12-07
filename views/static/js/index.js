{
    $(document).ready(function () {
        VerifyLocalToken();
    });

    $(document).ready(function () {
        $("#myTips").click(function () {
            $(this).attr('disabled', true);
            $("#getOne").attr('disabled', false);
            $(".content").load("/myTips");
        })
    });

    $(document).ready(function () {
        $("#getOne").click(function () {
            $(this).attr('disabled', true);
            $("#myTips").attr('disabled', false);
            $(".content").load("/putTip");
        })
    });

    $(document).ready(function() {
        $("#in_tips").click(seePutTips());
        $("#out_tips").click(seeGetTips());

        $("#getMan").click(function (){
            get('man');
            $(this).attr('disabled', true);
            setTimeout(function(){
                $("#getMan").attr('disabled', false);
                },1000);
        });

        $("#getWoman").click(function (){
            get('woman');
            $(this).attr('disabled', true);
            setTimeout(function(){
                $("#getWoman").attr('disabled', false);
            },1000);
        });
    });

    $(document).ready(function () {
        let isjump = window.localStorage.box_jump;
        if (isjump == "ok") {
            seeGetTips();
            window.localStorage.box_jump = "not";
        }else {
            $("#getOne").click();
        }
    });

    // $(document).ready(function () {
    //     $("#getOne").click();
    // });
}

// {
//     function myTips() {

//     }
// }

{
    // function putTip() {
    //     $(".content").load("/putTip");
    //     // window.localStorage['sex'] = sex;
    // }

    function inTip() {
        let wxid = $("#wxid").val();
        let info = $("#info").val();
        let sex = $("#sex").val();
        window.localStorage['sex'] = sex;
        $.ajax({
            type: "post",
            url: "/put",
            data: {
                'token': window.localStorage.box_sgb_val,
                'sex': window.localStorage.sex,
                'wxid': wxid,
                'info': info
            },
            success: function (jsapi) {
                jsapi = JSON.parse(jsapi);
                WeixinJSBridge.invoke('getBrandWCPayRequest', jsapi,
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:cancel" || res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("支付失败");
                        }
                    });
            }
        });
    }

    function get(sex) {
        $(".content").load("/getTip");
        window.localStorage['sex'] = sex

        $.ajax({
            type: "post",
            url: "/get",
            data: {
                'token': window.localStorage.box_sgb_val,
                'sex': window.localStorage.sex
            },
            success: function (jsapi) {
                jsapi = JSON.parse(jsapi);
                WeixinJSBridge.invoke('getBrandWCPayRequest', jsapi,
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:cancel" || res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("支付失败");
                        }
                    });
            }
        });
    }
}

{
    function seePutTips() {
        $("#in_tips").attr('disabled', true);
        $("#out_tips").attr('disabled', false);
        $.ajax({
            type: "post",
            url: "/peekIPut",
            data: {
                'token': window.localStorage.box_sgb_val
            },
            success: function (data) {
                $("#TipsHere").html("");
                data = JSON.parse(data);
                if (data == null) {
                    $("#TipsHere").append("<div style=\"text-align: center;color: white; padding-top: 10px;\">您尚未放入哦～放入一个吧</div>");
                    return
                }
                for (let i = 0; i < data.length; i++) {
                    $("#TipsHere").append("<div class=\"row mt-3\">\n" +
                        "            <div class=\"col-12\">\n" +
                        "            <div class=\"card\" style=\"width: 100%;\">\n" +
                        "                <div class=\"card-body\">\n" +
                        "                    <h5 class=\"card-title\" style=\"font-weight: bolder\">[" + (data[i].sex == 'man' ? '男生' : '女生') + "纸条]</h5>\n" +
                        "                    <p class=\"card-text\" style=\"font-weight: bolder\">我留的微信号：</p>\n" +
                        "                    <p class=\"card-text\">" + data[i].wxid + "</p>\n" +
                        "                    <p class=\"card-text\" style=\"font-weight: bolder\">自我介绍</p>\n" +
                        "                    <p class=\"card-text\">" + data[i].info + "</p>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>")
                }
            }
        })
    }

    function seeGetTips() {
        $("#out_tips").attr('disabled', true);
        $("#in_tips").attr('disabled', false);
        $.ajax({
            type: "post",
            url: "/peekIGet",
            data: {
                'token': window.localStorage.box_sgb_val
            },
            success: function (data) {
                $("#TipsHere").html("");
                data = JSON.parse(data);
                if (data == null) {
                    $("#TipsHere").append("<div style=\"text-align: center; color: white;padding-top: 10px; \">您尚未抽取哦～</div>");
                    return
                }
                //动态展示

                for (let i = 0; i < data.length; i++) {
                    $("#TipsHere").append("<div class=\"row mt-3\">\n" +
                        "            <div class=\"col-12\">\n" +
                        "            <div class=\"card\" style=\"width: 100%;\">\n" +
                        "                <div class=\"card-body\">\n" +
                        "                    <h5 class=\"card-title\" style=\"font-weight: bolder\">[" + (data[i].sex == 'man' ? '男生' : '女生') + "纸条]</h5>\n" +
                        "                    <p class=\"card-text\" style=\"font-weight: bolder\">" + (data[i].sex == 'man' ? '他' : '她') + "留的微信号：</p>\n" +
                        "                    <p class=\"card-text\">" + data[i].wxid + "</p>\n" +
                        "                    <p class=\"card-text\" style=\"font-weight: bolder\">自我介绍</p>\n" +
                        "                    <p class=\"card-text\">" + data[i].info + "</p>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>")
                }
            }
        })
    }
}


// {
//     function display_1() {
//         $("#display2").css("display", "none");
//         $("#display1").css("display", "block");
//     }
//
//     function display_2() {
//         $("#display1").css("display", "none");
//         $("#display2").css("display", "block");
//     }
// }

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 0;
}

function VerifyLocalToken() {
    let token = getQueryVariable("openid")
    let isjump = getQueryVariable("ts");
    if (token == 0) {
        if (isjump == "ok") {
            window.location.href = "https://admin.xunhuweb.com/pay/openid?mchid=ee034ef7b20047f3b6a4aedd17a86273&redirect_url=http://101.132.74.181?ts=ok"
        } else {
            window.location.href = "https://admin.xunhuweb.com/pay/openid?mchid=ee034ef7b20047f3b6a4aedd17a86273&redirect_url=http://101.132.74.181/"
        }
        return
    }
    window.localStorage['box_sgb_val'] = token
    window.localStorage['box_jump'] = isjump
    return window.localStorage.box_sgb_val;
}


