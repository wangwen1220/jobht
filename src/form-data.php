<?php
$timestamp = time();
error_reporting(0);
require_once "./lib.php";
require_once "./mysql.class.php";
require_once "./upload.class.php";

//数据库
$database['host'] = '192.168.2.123';
$database['user'] = 'root';
$database['pwd'] = '123456';
$database['db'] = 'ofweekhr20140220';
//END

$db = new mysql($database['host'], $database['user'], $database['pwd'], $database['db']);


//start opration
$type = $_GET['type'];

switch($type) {
case 'company_service':
	$sql = "INSERT INTO `gcw_company_service_data` (`company`, `name`, `contacts`, `email`, `notes`, `time`) VALUES ('".$_POST['company-name']."', '".$_POST['linkman']."','".$_POST['contact']."','".$_POST['email']."','".$_POST['description']."', '".$timestamp."')";
	$db->query($sql);
	echo '1';
	break;
case 'hosting_resume':
	$sql = "INSERT INTO `gcw_resume` (`name`,`intention_job`, `contacts`,`time`, `resume_file_id`) VALUES ('".$_POST['name']."', '".$_POST['jobs']."','".$_POST['contact-info']."', '".$timestamp."', '".$_POST['id']."')";
	$db->query($sql);
	echo '1';
	break;
case 'hosting_resume_file':
	$file_path = "upload/".date("Y")."/".date("m")."/".date("d");
	$uplader = new UpFile(array('filePath'=>$file_path));
	$file_result = $uplader->uploadFile("file");
	if ($file_result < 0) {
		$msg = $uplader->getErrorMsg();
		echo json_encode(array('result'=>0, 'message'=>$msg, 'errNum'=>$file_result));
	} else {
		//保存到数据库并返回数据库ID
		$sql = "INSERT INTO `gcw_upload_file` (`filename`,`filesize`,`filetype`,`time`) VALUES ('".$file_result['filepath']."', '".$file_result['filesize']."', '".$file_result['filetype']."', '".$timestamp."')";
		$db->query($sql);
		$last_insertid = $db->insert_id();
		echo json_encode(array('result'=>1,'message'=>$file_result, 'id'=>$last_insertid));
	}
	break;
default:
	echo '0';
	break;
}
