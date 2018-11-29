$(function () {
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 1000)
  })


  //在进入页面的时候进行状态获取
  if (location.href.indexOf('login.html') == -1) {
    $.ajax({
      type: 'get',
      url: "/employee/checkRootLogin",
      success:function(info){
        if(info.success){
          console.log(登录了)
        }
        if(info.error == 400){
          location.href = "login.html"
        }
      }
    })
  }


  //侧边栏下滑按钮
  $('.classification').click(function(){
    $(this).next().stop().slideToggle();
  })

  //点击左上按钮，侧边栏退出
  $('.glyphicon-align-justify').click(function(){
    $(".lt_aside").hasClass('active')
    $(".lt_header").hasClass('active')
    $(".lt_main").hasClass('active')
  })
})