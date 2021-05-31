$(function() {

    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度应在1~6个字符之间！'
            }
        }
    })

    // 调用初始化用户信息函数
    initUserInfo()

    //初始化用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //调用form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //为重置按钮功能实现
    $('#btnReset').on('click', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        //将用户信息重新获取
        initUserInfo()
    })

    // 表单提交按钮功能实现
    $('.layui-form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                //调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }

        })

    })





})