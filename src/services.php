<!DOCTYPE html>
<html class="services no-js">
<?php include 'header.html' ?>
<!-- <script>document.documentElement.className += ' about-us';</script> -->

  <div id="main">
    <div class="wrap">
      <a href="javascript:" id="direct-submit" class="direct-submit">直接提交合作意向</a>
    </div>
  </div>

  <script id="js-dialog-tpl" type="text/template">
    <div class="w-dialog-header"><h2 class="w-dialog-title"><i class="icon icon-rt"></i>提交合作意向</h2></div>
    <div class="w-dialog-body">
      <form action="./form-data.php?type=company_service" method="post" id="direct-submit-form" class="w-form">
        <fieldset>
          <div class="w-form-item">
            <label for="company-name" class="label"><i class="required">*</i>公司名称：</label>
            <input type="text" name="company-name" class="input" id="company-name" data-errormessage-required="请填写公司名称" />
          </div>

          <div class="w-form-item">
            <label for="linkman" class="label"><i class="required">*</i>联系人：</label>
            <input type="text" name="linkman" class="input" id="linkman" data-errormessage-required="请填写联系人" />
          </div>

          <div class="w-form-item">
            <label for="contact" class="label"><i class="required">*</i>联系方式：</label>
            <input type="text" name="contact" class="input js-placeholder" placeholder="电话或手机" id="contact" data-errormessage-required="请填写联系方式" />
          </div>

          <div class="w-form-item">
            <label for="email" class="label"><i class="required">*</i>邮箱：</label>
            <input type="text" name="email" class="input" id="email" data-errormessage-required="请填写您的邮箱" />
          </div>

          <div class="w-form-item">
            <label for="description" class="label"><i class="required">*</i>说明：</label>
            <textarea name="description" class="textarea" id="description" data-errormessage-required="请填写说明"></textarea>
          </div>

          <!-- <div class="w-form-item"><label class="label"></label> <button type="submit" class="button" disabled="disabled">提交</button></div> -->
          <div class="w-form-item">
            <label class="label"></label>
            <button type="submit" class="button">提交</button>
          </div>
        </fieldset>
      </form>
    </div>
  </script>

<?php include 'footer.html' ?>