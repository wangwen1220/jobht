<!DOCTYPE html>
<html class="hosting-resume no-js">
<?php include 'header.html' ?>

  <div id="main">
    <div class="wrap">
      <div class="position">位置：<a href="/">高才网</a> &gt; <a class="cur">托管简历</a></div>
      <div class="content">
        <div id="upload-resume" class="upload-resume">
          <button data-action="./form-data.php?type=hosting_resume_file">选择简历上传</button>
        </div>
        <div id="upload-output" class="upload-output fn-hide">
          <p class="upload-status"><i class="iconfont">&#61513;</i> 上传成功：<span id="filename" class="filename"></span>(中文简历)</p>
          <p>简历上传成功，如有合适职位，我们的猎头顾问将与您联系。</p>
          <p>请设置您的基本信息，以便猎头顾问能快速为您匹配职位</p>
          <form action="./form-data.php?type=hosting_resume" method="post" id="form-resume" class="w-form">
            <input type="hidden" id="fileid" name="id" />
            <fieldset>
              <div class="w-form-item">
                <label for="name" class="label">姓名：</label>
                <input type="text" name="name" class="input" id="name" />
              </div>

              <div class="w-form-item">
                <label for="jobs" class="label">意向职位：</label>
                <input type="text" name="jobs" class="input" id="jobs" />
              </div>

              <div class="w-form-item">
                <label for="contact-info" class="label">联系方式：</label>
                <input type="text" name="contact-info" class="input js-placeholder" placeholder="手机或邮箱" id="contact-info" />
              </div>

              <div class="w-form-item">
                <label class="label"></label>
                <button type="submit" class="button">提交</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>

<?php include 'footer.html' ?>