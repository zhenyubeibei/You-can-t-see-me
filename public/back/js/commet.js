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
        console.log(登录了)
      }
      if(info.error === 400){
        //拦截登录
        location.href = "login.html"
      }
    }
  })
}