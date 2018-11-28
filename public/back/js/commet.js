// 做一下进度条事件，谁需要给谁添加
$(document).ajaxStart(function(){
  //开启进度条
  NProgress.start()
})
$(document).ajaxStop(function(){
  //关闭进度条
  setTimeout(function(){
    NProgress.done()
  },500)
})


//一进入页面需要进行登陆状态获取
if(location.href.indexOf("login.html") === -1){
  $.ajax({
    type:'get',
    dataType:'json',
    url:'/employee/checkRootLogin',
    success:function(info){
      if(info.success){
        console.log('登录了')
      }
      if(info.error === 400){
        //拦截登录
        location.href = "login.html"
      }
    }
  })
}

$(function(){
// 3.点击mean按钮，使侧边栏退回去

  $('.mean_left').click(function(){
    console.log(1111)
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_header').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
  })


  //4.切换一二级导航
  $('.second_a').click(function(){
    $(this).next().stop().slideToggle();
  })

  //5调用模态框
  $('.back').click(function(){
    $('#myModal').modal("show")
  })
  //注册ajax事件
  $('#logoutBtn').click(function(){
    console.log(123)
  $.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    dataType:'json',
    success:function(info){

      if(info.success){
        location.href = "login.html"
      }
      if(info.error){
        alert('未知错误404')
      }
    }
  })
})


})