$(function () {

  //进行表单校验
  //用户名不能为空
  //密码不能为空，且必须是6-12位
  $('#form').bootstrapValidator({

    // input状态样式图片   配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    

    //对 字段进行校验
    fields: {
      username: {
        //校验规则 
        validators: {
          //非空校验
          notEmpty: {
            //为空时显示的提示信息
            message: '用户名不能为空'
          },
          //长度要求2-6位
          stringLength: {
            min:2,
            max:6,
            message: '用户名长度必须为2-6位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        //校验规则 
        validators: {
          //非空校验
          notEmpty: {
            //为空时显示的提示信息
            message: '密码不能为空'
          },
          //长度要求6-12位
          stringLength: {
            min:6,
            max:12,
            message: '用户名长度必须为6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      },
    }
  })

  //进行登陆请求
  //通过ajax进行登陆等求
  //表单校验插件 会在表单提交的时候进行校验
  //如果校验成功，需要阻止这次默认的提交，由ajax进行数据提交
  //如果校验失败，默认会阻止提交
  $('#form').on("success.form.bv",function(e){

    //阻止默认的提交
    e.preventDefault();
    
    //通过ajax进行提交申请
    $.ajax({
      type:'post',
      dataType:'json',
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      success:function(info){
        console.log(info)
        if(info.success){
          //登陆成功
          location.href = 'index.html'
        }
        if(info.error === 1000){
          // updateStatus
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 校验规则, 可以设置提示文本
          //用户名不存在
          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error === 1001){
          console.log(5555)
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })


  //重置功能
  $('.reset').click(function(){
    console.log(123)
    $('#form').data("bootstrapValidator").resetForm();
  })
})