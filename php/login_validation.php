<?php	
	include_once('db.php');
	
	error_reporting(E_ALL ^ E_DEPRECATED);
	$user=mysql_real_escape_string(isset($_POST["usuario"]) ? $_POST["usuario"]:'');
	$senha=mysql_real_escape_string(isset($_POST["senha"]) ? $_POST["senha"]:'');
	
	if (empty($user) || empty($password)){
		echo "Vazio";
	}
		
		//header("Location: faillogin.html");
	//var_dump($user);
	//var_dump($senha);
	$sql="SELECT count(*) FROM Dados WHERE email='$user' AND senha='$senha'";

	$res=mysql_query($sql);
	//var_dump($sql);
	//var_dump($res);
	$row=mysql_fetch_array($res);
	//var_dump($row[0]);
	if ($row[0]>0){
		
		
		//echo 'Deu Bom.';
		session_start();
		$_SESSION['email']=$user;
		$_SESSION['senha']=$senha;
		echo "<script> location.href='../TelaInicial.html'; </script>";
        exit;
		
  		
		//var_dump("Login com sucesso!!");
		

	    //header("Location: login_c.html");
	}
	else{
		var_dump("Login sem sucesso!!");
		//echo 'Deu ruim.';
		session_destroy();
		session_unset('email');
	    session_unset('senha');
	    //header("Location: ../login.html");
		//header("Location: ../faillogin.html");}
	}
?>