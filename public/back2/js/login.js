$(function () {

  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应input表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
        }
      },
    }
  })

  // 当表单校验成功时，会触发success.form.bv事件，此时会提交表单，
  // 这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。

  $('#form').on('success.form.bv', function (e) {

    //阻止表单的自动提交
    e.preventDefault();

    //使用ajax提交

    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          location.href = "index.html"
        }
        if (info.error === 1000) {
          // 用户名不存在
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (info.error === 1001) {
          // 密码不存在
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");

        }
      }
    })

  })

})