$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //先渲染一次页面
  render()

  //封装render函数
  function render() {
    //通过ajax获取数据
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var htmlStr = template('secondTpl', info)
        $('tbody').html(htmlStr)

        //根据数据 动态设置分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //2.点击添加分类，注册点击事件
  $('.add').on('click', function () {
    //显示模态框
    $('#secondModal').modal('show');
    //发送ajax请求 获取全部数据，渲染到li中
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info)
        var htmlStr1 = template('dropdownBtn', info)
        $('.dropdown-menu').html(htmlStr1)
      }
    })
  })

  //3.给下拉列表的a添加点击事件，通过事件委托
  $('.dropdown-menu').on('click', 'a', function () {
    //获取文本值
    var txt = $(this).text();
    //赋值给按钮
    $('#dropdownText').text(txt);
    //获取id
    var id = $(this).data(id)
    //把获取的id通过隐藏域上传
    $('[name = "categoryId"]').val(id)
      // 调用updateStatus更新 隐藏域 校验状态成 VALID
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  //4.配置文件上传插件，让插件异步上传数据请求

  $("#fileupdate").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var picObj = data.result
      var picUrl = picObj.picAddr
      //把获取到的地址赋值给img
      $('.dropimg').attr('src', picUrl)
      //给隐藏域设置图片地址
      $('[name="brandLogo"]').val(picUrl)

      // 调用updateStatus更新 隐藏域 校验状态成 VALID
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")

    }
  })

  //5.校验提交状态
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields:{
      categoryId:{
      //校验规则
      validators:{
        //非空规则
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    brandName:{
      //校验规则
      validators:{
        //非空规则
        notEmpty:{
          message:"请选择二级分类"
        }
      }
    },
    brandLogo:{
      //校验规则
      validators:{
        //非空规则
        notEmpty:{
          message:"请上传logo"
        }
      }
    }
    }
  })

  //5.添加二级分类  通过ajax  注册表单验证成功事件，阻止表单默认提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info)
        //取消模态框
        $('#secondModal').modal('hide')

      }
    })
  })

  

});