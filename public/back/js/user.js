$(function(){
    var currentPage = 1;
    var pageSize = 5;

    var currentId //获取当前id
    var idDelete //修改的状态
    //先调用一次s
    render();
    //封装渲染页面的函数render()
    function render(){
      //通过ajax获取数据
      $.ajax({
        type:'get',
        url:'/user/queryUser',
        dataType:'json',
        data:{
          page:currentPage,
          pageSize:pageSize
        },
        success:function( info ){
          console.log(info)
          var htmlStr = template('userTpl',info)
          $('tbody').html(htmlStr)

          //在ajax请求数据回来后，根据数据进行初始化分页插件
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:info.page,//当前页
            totalPages:Math.ceil(info.total / info.size),//总页数
            onPageClicked:function(a, b, c,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
              currentPage = page;
              //重新渲染
              render()
            }
          });
        }
      })
    }

    //2.给按钮注册点击事件 / 用事件委托
    $('tbody').on('click','.btn',function(){
      //显示模态框
      $('#btnModal').modal('show')

      //获取用户id根据id选择改成什么状态
      currentId = $(this).parent().data("id");
      isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ;
    })
    //模态框确认按钮被点击，应该发送ajax，进行修改用户状态
    $('#confireBtn').click(function(){
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        dataType:"json",
        data:{
          id : currentId,
          isDelete:isDelete
        },
        success:function(info){
          console.log(info)
          if(info.success){
            //取消模态框
            $('#btnModal').modal('hide');
            //重新渲染页面
            render()
          }
        }
      
      })
    })






})