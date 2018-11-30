$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //先执行一次渲染页面
  render()

  //封装函数render
  function render() {
    //利用ajax从后台获取数据

    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var htmlStr = template('firstTpl', info)
        $('tbody').html(htmlStr)

        //根据数据 添加分页器
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          //添加页码点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }

  //2.点击添加按钮 显示模态框
  $('.add').click(function () {
    $('#firstModal').modal("show")
  })

  //3.进行表单校验
  $('#form').bootstrapValidator({
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields: { // input框中需要配置 name
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }

    }
  })

  //注册表单验证成功事件，阻止默认跳转，通过ajax发送请求
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (info) {
        if (info.success) {
          //关闭模态框
          $(firstModal).modal('hide')
          //重新渲染页面
          render()
          //重置表单信息
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})