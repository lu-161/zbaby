$(function() {

    // 调用getUserInfo() 获取用户信息
    getUserInfo()

    //导入layer
    var layer = layui.layer

    //退出按钮功能
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 退出登录后，要清除本地存储中的token字段
            localStorage.removeItem('token')
                //重新跳转到登录页面
            location.href = 'login.html'
                // 关闭提示框
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象(要在请求头上加什么字段，就在headers里声明)
        // headers: {
        //     // Authorization的值从localstorage里取
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renserAvatar 渲染用户的头像
            renderAvatar(res.data)
        }

        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //   // console.log('执行了 complete 回调：')
        //   // console.log(res)
        //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 1. 强制清空 token
        //     localStorage.removeItem('token')
        //     // 2. 强制跳转到登录页面
        //     location.href = '/login.html'
        //   }
        // }
    })
}


//渲染用户头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avater').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater')
            .html(first)
            .show()
    }
}