$(function() {

    var form = layui.form
    var layer = layui.layer


    //定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不可与旧密码一致！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }

    })


    $('.layui-form').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更改密码失败！')
                }
                layer.msg('更改密码成功！')
                    //更新密码成功后，要将表单重置，还原为空白表单
                    //原生form表单元素有一个reset方法，可以重置form表
                    // 用[0]方式将jQuery元素转换成原生dom元素
                $('.layui-form')[0].reset()
            }
        })
    })
})