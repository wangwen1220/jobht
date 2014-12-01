<?php
if (!empty($_GET))
{
	$_GET  = addslashes_deep($_GET);
}
if (!empty($_POST))
{
	$_POST = addslashes_deep($_POST);
}
$_COOKIE = addslashes_deep($_COOKIE);


function addslashes_deep($value)
{
    if (empty($value))
    {
        return $value;
    }
    else
    {
		if (!get_magic_quotes_gpc())
		{
		$value=is_array($value) ? array_map('addslashes_deep', $value) : addslashes($value);
		}
//		$value=is_array($value) ? array_map('addslashes_deep', $value) : mystrip_tags($value);//有BUG,已改写前提关闭magic_gpc
		if(!is_array($value)) $value =  mystrip_tags($value);
		return $value;
    }
}
function mystrip_tags($string)
{
	$string = str_replace(array('&amp;', '&quot;', '&lt;', '&gt;'), array('&', '"', '<', '>'), $string);
	$string = strip_tags($string);
	return $string;
}

