$(function () {
  var currentPage = 1
  var pageSize = 5
  var picArr = []
  render()

  function render() {

    //通过ajax向后台获取数据
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var htmlStr = template('productTpl', info)
        $('tbody').html(htmlStr)

        //进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          //页码点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }

  //2.点击下架显示模态框 通过事件委托
  $('tbody').on('click', '.shelves', function () {
    $('#proModal').modal('show')
  })

  //3.点击确定，通过ajax向后台发送数据，动态渲染页面
  $('.determine').click(function () {
    //取消模态框
    $('#proModal').modal('hide')

  })

  //4.点击添加商品，显示模态框
  $('#addPro').click(function () {
    //显示模态框
    $('#addModal').modal('show')
    //动态获取商品二级分类 通过ajax
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info)
        console.log(456)
        var htmlStr = template('dropTpl', info)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })

  //5.点击a 给a注册点击事件，获取a的id赋值给隐藏域

  $('.dropdown-menu').on('click', 'a', function () {

    //获取文本，赋值给按钮
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    //获取id赋值给隐藏域
    var id = $(this).data('id')
    $('[neme = "brandId"]').val(id)

    //赋值之后，改变校验的状态
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  //6.配置文件上传插件
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var picObj = data.result

      //将上传的图片添加到最前面
      picArr.unshift(picObj)
      var picUrl = picObj.picAddr
      //将每次上传的照片(地址和名称)显示在最前面
      $('.imgBox').prepend('<img src="' + picUrl + '" style = "width:100px">')
      //如果图片的长度超过了3，将他移除
      if (picArr.length > 3) {
        picArr.pop() //删除数组最后一项
        //从结构上，删除最后一项
        $('.imgBox img:last-of-type').remove(); //让它自杀
      }
      //如果文件上传到了3张，更改picstatu的状态，成VALID
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
        // $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");

      }
    }
  });

  //7.添加表单验证
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码，必须是xx-xx数字'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张照片'
          }
        }
      },

    }
  })

  //8.注册一个表单验证成功事件，阻止表单默认提交，由ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();

    var paramsStr = $('#form').serialize();

    //还需要拼接图片的所有数据

    paramsStr += "&picName1" + picArr[0].picName + "&picAddr1" + picArr[0].picAddr;
    paramsStr += "&picName2" + picArr[1].picName + "&picAddr2" + picArr[1].picAddr;
    paramsStr += "&picName3" + picArr[2].picName + "&picAddr3" + picArr[2].picAddr;

    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      dataType: 'json',
      data: paramsStr,
      success: function (info) {
        if (info.success) {
          console.log(6654)
          //关闭模态框
          $('#addModal').modal('hide')
          //重新渲染第一页
          currentPage = 1
          render()
          $('#form').data("bootstrapValidator").resetForm(true);
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })
})