<!DOCTYPE html>
<html class="contact-us no-js">
<?php include 'header.html' ?>
<!-- <script>document.documentElement.className += ' about-us';</script> -->

  <div id="main">
    <div class="wrap">
      <!-- slide -->
      <div id="js-slide-imgdot" class="arale-slide-imgdot slider">
        <ul data-switchable-role="content" class="ui-switchable-content">
          <li class="ui-switchable-panel"><a href="#"><img src="img/pic-slide1.jpg" /></a></li>
          <li class="hidden ui-switchable-panel"><a href="#"><img src="img/pic-slide2.jpg" /></a></li>
        </ul>
        <ul data-switchable-role="nav" class="ui-switchable-nav">
          <li class="ui-switchable-trigger ui-switchable-active">●</li>
          <li class="ui-switchable-trigger">●</li>
        </ul>
      </div>
      <!-- /slide -->

      <div id="js-tab" class="arale-tab loginbox">
        <ul class="ui-switchable-nav">
          <li>注册</li>
          <li>登录</li>
        </ul>
        <div class="ui-switchable-content">
          <div class="hidden">
            内容 A
            <pre>
              - 在当前 trigger 中 mouseover/mouseout, click, focus, 不触发
              - 鼠标快速滑过非当前 trigger, 不触发
              - mouseover 到非当前 trigger, 停留时间到达延迟时，触发
              - click 或 Tab 切换到 trigger, 立即触发
              - switch / switched 事件的触发
            </pre>
          </div>
          <div class="hidden">内容 B</div>
        </div>
      </div>

      <form action="" method="post" class="search" id="search">
        <strong>寻找高薪职位，从这里出发</strong>
        <input type="text" class="item kw js-kw" name="kw" placeholder="请输入关键词" />
        <span class="item area"><span class="txt">工作地点</span><i class="icon"></i></span>
        <button type="submit" class="item submit">搜索</button>
      </form>
    </div>
  </div>

  <div id="hot-jobs">
    <div class="wrap">
      <h2 class="title">热门招聘</h2>
      <ul class="jobs clearfix">
        <li class="new"><a href="#">技工</a></li>
        <li><a href="#">电工</a></li>
        <li><a href="#">其他技工类</a></li>
        <li class="new"><a href="#">模具工</a></li>
        <li><a href="#">信息技术</a></li>
        <li><a href="#">高级硬件工程师</a></li>
        <li class="new"><a href="#">软件工程师</a></li>
        <li><a href="#">程序员</a></li>
        <li class="new"><a href="#">硬件工程师</a></li>
        <li><a href="#">网页设计</a></li>
        <li><a href="#">美工</a></li>
        <li><a href="#">软件架构设计师</a></li>
        <li class="new"><a href="#">技工</a></li>
        <li><a href="#">其他技工类</a></li>
        <li><a href="#">模具工</a></li>
        <li><a href="#">软件架构</a></li>
      </ul>
    </div>
  </div>

<?php include 'footer.html' ?>