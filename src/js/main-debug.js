////////////////////////////////////////////////////////////////////////////////
// 名称: 高才网主程序
// 作者: Steven wangwen1220@139.com
// 说明: 依赖 seajs and jQuery
// 日期: 2014-3-20
////////////////////////////////////////////////////////////////////////////////
// ###### Config
seajs.config({
  // 基础路径设置
  // base: '../sea-modules/',

  // 路径配置
  paths: {
    // 'jq1.8.0': 'jquery/jquery/1.8.0',
    'jqpath': 'jquery/jquery/1.10.1'
  },

  // 别名配置
  alias: {
    '$': 'jqpath/jquery.js',
    '$-debug': 'jqpath/jquery-debug.js',
    'jquery': 'jqpath/jquery.js',
    'jquery-debug': 'jqpath/jquery-debug.js',
    'jquery-smartfloat': 'steven/jquery-smartfloat/1.3.0/jquery-smartfloat',
    'dialog': 'atans/artDialog/6.0.0/dialog',

    'slide': 'arale/switchable/1.0.2/slide',
    'tabs': 'arale/switchable/1.0.2/tabs',
    'validator': 'arale/validator/0.9.7/validator',
    'widget': 'arale/widget/1.1.1/widget',
    'upload': 'arale/upload/1.1.1/upload',

    'seajs-style': 'seajs/seajs-style/1.0.2/seajs-style',

    'modernizr': 'gallery/modernizr/2.7.1/modernizr',
    'es5-safe': 'gallery/es5-safe/0.9.2/es5-safe',
    'json': 'gallery/json/1.0.3/json'
  },

  // 映射配置
  map: [
    // 批量更新时间戳
    // [/^(.*\.(?:css|js))(.*)$/i, '$1?t=20140321'],
    // ['.js', '-debug.js']
  ],

  // 调试模式
  debug: true,

  // 文件编码：获取模块文件时，标签的 charset 属性
  //charset: 'utf-8',

  // 预加载项
  preload: [
    'modernizr',
    // this.jQuery ? '' : 'jquery',
    'seajs-style',
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ]
});

// ###### Main
seajs.use(['$', 'slide', 'tabs', 'dialog', 'widget', 'validator', 'upload', 'jquery-smartfloat'], function($, Slide, Tabs, dialog, Widget, Validator, Uploader) {
  // ##### Helpers
  function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
  }

  function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  }

  var supportPlaceholder = 'placeholder' in document.createElement('input');

  // IE 版本判断
  var isIE = !!window.ActiveXObject;
  var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

  // 提示信息
  function log(msg) {
    window.console && window.console.log(msg);
  }

  // document.getElementById 简写
  function $$(id) {
    return 'string' === typeof id ? document.getElementById(id) : id;
    // return isString(id) ? document.getElementById(id) : id;
  }

  // 文档加载完执行
  $(function() {
    // log(jQuery.fn.jquery)

    // 通用变量
    var $main = $('#main');
    var $regform = $('#js-regform');
    // var $template = $('#js-template');
    var $dialogTpl = $('#js-dialog-tpl').html();

    // 表单验证组件
    var WValidator = Validator.extend({
      attrs: {
        explainClass: "w-form-explain",
        itemClass: "w-form-item",
        itemHoverClass: "w-form-item-hover",
        itemFocusClass: "w-form-item-focus",
        itemErrorClass: "w-form-item-error",
        inputClass: "input",
        textareaClass: "textarea",
        showMessage: function (message, element) {
          message = '<i class="iconfont">&#xF045;</i><span class="txt">' + message + '</span>';
          this.getExplain(element).html(message);
          this.getItem(element).addClass(this.get('itemErrorClass'));
        }
      }
    });

    // 区号+座机号码+分机号码：/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    Validator.addRule('tel', /^(0\d{2,3}\-)?([2-9]\d{6,7})(\-\d{1,4})?$/, '请输入正确的{{display}}');

    // 电话号码校验规则（支持手机号码，3-4位区号，7-8位直播号码，1-4位分机号）
    Validator.addRule('phone', Validator.getRule('tel').or('mobile'), '{{display}}的格式必须是电话或者手机号码');

    // 邮箱或者手机号码
    Validator.addRule('emailOrMobile', Validator.getRule('email').or('mobile'), '{{display}}的格式必须是邮箱或者手机号码');

    // 初始化所有使用 `data-widget` 指定的组件
    // Widget.autoRenderAll();

    // 表单验证
    // var validForm = (function() {
    (function() {
      var $validator = $('.js-validator');
      if (!$validator.length) return;

      var validator = new WValidator({
        element: $validator,
        onFormValidated: function(err, results, $form) {
          if (!err) {
            $form.addClass('validated');
          }
        },
        // onItemValidated: function(err, results, $item, event) {
        //   // window.console && console.log && console.log(err, results, form);
        // },
        failSilently: true
      });

      // 未知的验证项
      validator.addItem({
        element: '#name',
        required: true
      })
      // .addItem({
      //   element: '#password-confirmation',
      //   required: true,
      //   rule: 'confirmation{target: "#password", name: "第一遍"}',
      //   errormessageRequired: '请再重复输入一遍密码，不能留空。'
      // })
      .addItem({
        element: '#contact',
        required: true,
        rule: 'emailOrMobile'
      })
      .addItem({
        element: '#phone',
        required: true,
        rule: 'phone'
      })
      .addItem({
        element: '#email',
        required: true,
        rule: 'email'
      });

      // return arguments.callee;
    }());

    // 搜索框获得或失去焦点
    if (!supportPlaceholder) {
      $(document).on({
        focus: function() {
          var $ths = $(this);
          var defaultval = this.placeholder || this.defaultValue;
          $ths.addClass('focus').removeClass('placeholder');
          if (this.value === defaultval) {
           this.value = '';
          }
        },
        blur: function() {
          var $ths = $(this);
          var defaultval = this.placeholder || this.defaultValue;
          $ths.removeClass('focus');

          if (this.value === '') {
            this.value = defaultval;
          }
          if (defaultval === this.value) {
            $ths.addClass('placeholder');
          }
        }
      }, '.js-placeholder').find('.js-placeholder').trigger('blur');
    }

    // Arale 原点形式图片轮播
    var $imgDotSlide = $('#js-slide-imgdot');
    if ($imgDotSlide.length) {
      var imgDotSlide = new Slide({
        element: $imgDotSlide,
        effect: 'fade',
        // autoplay: false,
        duration: 800,
        easing: 'easeBoth',
        activeIndex: 0
      }).render();
    }

    // Arale 高度自适应 tab
    var $tab = $('#js-tab');
    if ($tab.length) {
      var tabs = new Tabs({
        element: $tab,
        triggers: $tab.find('.ui-switchable-nav > li'),
        panels: $tab.find('.ui-switchable-content > div'),
        activeIndex: 0
      });
    }

    // setTimeout(function() {
    //   tabs.set("activeIndex", 0);
    // }, 3000);

    // 智能浮动
    $('#smart-float').smartFloat();

    // 关于我们侧边导航
    $('#js-nav-about-us').on('click', 'li', function() {
      $(this).addClass('on').siblings().removeClass('on');
      $(window).scroll(); // 修复在谷歌浏览器（34.0.1847.116 m）上导航诡异消失的问题
    });

    // 提交合作意向弹窗
    // var $dialogTpl = $('#js-dialog-tpl').html();
    $main.on('click', 'a.direct-submit', function(event) {
      event.preventDefault();
      var d = dialog({
        skin: 'ui-dialog-gcw ui-dialog-notitle',
        fixed: true,
        title: 'No Title',
        cancelValue: '关闭',
        // content: '玩命加载中...',
        content: $dialogTpl,
        onshow: function() {
          if (!supportPlaceholder) $('.js-placeholder').blur();

          // 表单验证
          var validator = new WValidator({
            element: '#direct-submit-form',
            onFormValidated: function(err, results, $form) {
              if (!err) {
                $form.addClass('validated');

                // 表单 ajax 提交
                $.post($form.attr('action'), $form.serializeArray(), function(res) {
                  // log(res);
                  if (res == 1) {
                    d.close().remove();
                    var dd = dialog({
                      skin: 'ui-dialog-gcw ui-dialog-notitle ui-dialog-tips',
                      fixed: true,
                      title: 'No Title',
                      cancelValue: '关闭',
                      content: '信息提交成功！',
                      backdropOpacity: 0.2
                    }).showModal();
                    setTimeout(function() {
                      dd.close().remove();
                      // $(window).scrollTop(0);
                      // window.location.reload();
                    }, 2000);
                  } else {
                    alert('数据提交出错！');
                  }
                });
              }
            },
            // onItemValidated: function(err, results, element, event) {
            //   // window.console && console.log && console.log(err, results, form);
            // },
            autoSubmit: false,
            failSilently: true
          });

          // 添加表单验证项
          validator.addItem({
            element: '#company-name',
            required: true
          })
          .addItem({
            element: '#linkman',
            required: true
          })
          .addItem({
            element: '#contact',
            required: true,
            rule: 'phone'
          })
          .addItem({
            element: '#email',
            required: true,
            rule: 'email'
          })
          .addItem({
            element: '#description',
            required: true
          });

          // $('.direct-submit-form').on('submit', function(event) {
          //   event.preventDefault();
          //   var $ths = $(this);
          //   if ($ths.hasClass('validated') || isIE) {
          //     $.post(this.action, $ths.serializeArray(), function(res) {
          //       log(res);
          //       if (res == 1) {
          //         var d = dialog({
          //           skin: 'ui-dialog-gcw ui-dialog-notitle ui-dialog-tips',
          //           fixed: true,
          //           title: 'No Title',
          //           content: '信息提交成功！',
          //           backdropOpacity: 0.2
          //         }).showModal();
          //         setTimeout(function() {
          //           d.close().remove();
          //           $(window).scrollTop(0);
          //           window.location.reload();
          //         }, 2000);
          //       }
          //     });
          //   }
          // });
        },
        backdropOpacity: 0.2
      }).showModal();
    });

    // 文件上传
    var resumeUploader = $('#upload-resume button');
    var $uploadOutput = $('#upload-output');
    if (resumeUploader.length) {
      new Uploader({
        trigger: resumeUploader,
        // action: resumeUploader.data('action'),
        success: function(res) {
          // log(res)
          res = eval('(' + res + ')');
          if (res.result) {
            $('#filename').text(res.message.filename);
            $('#fileid').val(res.id);
            $uploadOutput.show();

            // 表单验证
            var validator = new WValidator({
              element: '#form-resume',
              onFormValidated: function(err, results, $form) {
                if (err) return;
                $form.addClass('validated');

                // 表单 ajax 提交
                $.post($form.attr('action'), $form.serializeArray(), function(res) {
                  if (res == 1) {
                    var d = dialog({
                      skin: 'ui-dialog-gcw ui-dialog-notitle ui-dialog-tips',
                      fixed: true,
                      title: 'No Title',
                      cancelValue: '关闭',
                      content: '信息提交成功！',
                      backdropOpacity: 0.2
                    }).showModal();
                    setTimeout(function() {
                      d.close().remove();
                      $(window).scrollTop(0);
                      window.location.reload();
                    }, 2000);
                  } else {
                    alert('信息提交失败！');
                  }
                });
              },
              autoSubmit: false,
              failSilently: true
            });

            // 未知的验证项
            validator.addItem({
              element: '#name',
              required: true
            })
            .addItem({
              element: '#jobs',
              required: true
            })
            .addItem({
              element: '#contact-info',
              required: true,
              rule: 'emailOrMobile'
            });
          } else {
            alert(res.message);
          }
        },
        error: function(res) {
          alert('~囧~上传失败了！请重试或联系网站管理员。');
        }
      });

      // 基本信息 ajax 提交
      // $uploadOutput.on('submit', 'form', function(event) {
      //   event.preventDefault();
      //   var $ths = $(this);
      //   if ($ths.hasClass('validated')) {
      //     $.post(this.action, $ths.serializeArray(), function(res) {
      //       if (res == 1) {
      //         var d = dialog({
      //           skin: 'ui-dialog-gcw ui-dialog-notitle ui-dialog-tips',
      //           fixed: true,
      //           title: 'No Title',
      //           content: '基本信息提交成功！',
      //           backdropOpacity: 0.2
      //         }).showModal();
      //         setTimeout(function() {
      //           d.close().remove();
      //           $(window).scrollTop(0);
      //           window.location.reload();
      //         }, 2000);
      //       }
      //     });
      //   }
      // });
    }

    // 提交名片弹窗
    // var $dialogTpl = $('#js-dialog-tpl').html();
    $('#js-update-card').on('click', function(event) {
      event.preventDefault();
      var d = dialog({
        skin: 'ui-dialog-gcw ui-dialog-notitle',
        fixed: true,
        title: 'No Title',
        cancelValue: '关闭',
        // content: '玩命加载中...',
        content: $dialogTpl,
        onshow: function() {
          // if (!supportPlaceholder) $('.js-placeholder').blur();

          // 表单验证
          var validator = new WValidator({
            element: '#update-card-form',
            onFormValidated: function(err, results, $form) {
              if (!err) {
                $form.addClass('validated');

                // 表单 ajax 提交
                $.post($form.attr('action'), $form.serializeArray(), function(res) {
                  // log(res);
                  if (res == 1) {
                    d.close().remove();
                    var dd = dialog({
                      skin: 'ui-dialog-gcw ui-dialog-notitle ui-dialog-tips',
                      fixed: true,
                      title: 'No Title',
                      cancelValue: '关闭',
                      content: '信息提交成功！',
                      backdropOpacity: 0.2
                    }).showModal();
                    setTimeout(function() {
                      dd.close().remove();
                      // $(window).scrollTop(0);
                      // window.location.reload();
                    }, 2000);
                  } else {
                    alert('数据提交出错！');
                  }
                });
              }
            },
            // onItemValidated: function(err, results, element, event) {
            //   // window.console && console.log && console.log(err, results, form);
            // },
            autoSubmit: false,
            failSilently: true
          });

          // 添加表单验证项
          validator.addItem({
            element: '#name',
            required: true
          })
          .addItem({
            element: '[name=sex]',
            required: true,
            errormessageRequired: '请选择您的性别'
          })
          .addItem({
            element: '#job',
            required: true
          })
          .addItem({
            element: '#mobile',
            required: true,
            rule: 'mobile'
          })
          .addItem({
            element: '#email',
            required: true,
            rule: 'email'
          })
          .addItem({
            element: '#file',
            required: true,
            errormessageRequired: '请上传您的简历'
            // display: '支持word/pdf/txt/jpg格式'
            // onItemValidated: function(err, message, $input, event) {
            //   if (!err) {
            //     $input.next('.w-form-explain').html('<i class="iconfont">&#61513;</i> 上传成功：');
            //   }
            // },
          });

          // 简历上传
          // var resumeUploader = $('#update-card-form .btn-upload');
          new Uploader({
            trigger: '#update-card-form .btn-upload',
            // action: resumeUploader.data('action'),
            success: function(res) {
              // log(res)
              res = eval('(' + res + ')');

              if (res.result) {
                var $fileInput = $('#file');
                $fileInput.closest('.w-form-item').removeClass('w-form-item-error').addClass('w-form-item-success');
                $fileInput.val(res.id);
                $fileInput.siblings('.w-form-explain').remove();
                $fileInput.siblings('.w-form-tips').html('<i class="iconfont">&#61513;</i> 上传成功：<strong>' + res.message.filename + '</strong>');
              } else {
                alert(res.message);
              }
            },
            error: function(res) {
              alert('~囧~上传失败了！请重试或联系网站管理员。');
            }
          });
        },
        backdropOpacity: 0.2
      }).showModal();
    });
  });

  // 页面加载完执行
  $(window).load(function() {
    // 让 IE6 缓存背景图片
    // TredoSoft Multiple IE doesn't like this, so try{} it
    try {
      document.execCommand("BackgroundImageCache", false, true);
    } catch(r) {}
  });
});