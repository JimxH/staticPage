<?php
	$uname=$_REQUEST['uname'];
	$ugender=$_REQUEST['gender'];
	$uphone=$_REQUEST['phone'];
	$umsg=$_REQUEST['msg'];
	$uday=$_REQUEST['uday'];
	
	//$conn=mysqli_connect('127.0.0.1','root',"",'audi',3306);
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	$sql="INSERT INTO test VALUES(NULL,'$uname','$ugender','$uphone','$umsg','$uday')";
	
	$result=mysqli_query($conn,$sql);

	if($result){
		echo 'success';
	}else{
		echo 'err'.$sql;
	}

?>