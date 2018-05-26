
<!DOCTYPE HTML>
<html>
<head>
<code><meta charset="utf-8" /></code>
<title></title>
<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
<link href="css/bootstrap.css" rel='stylesheet' type='text/css' />
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
 <!--[if lt IE 9]>
     <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
     <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- start plugins -->
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<!-- start slider -->
<link href="css/slider.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="js/modernizr.custom.28468.js"></script>
<script type="text/javascript" src="js/jquery.cslider.js"></script>
<script>
$(document).ready(function(){

    $("#field1").hide();
    $("#field2").hide();
    $("#field3").hide();
    $("#field4").hide();
    $("#field5").hide();
    $("#field6").hide();

    $("#button1").click(function(){
        $("#field1").toggle();
    });
    $("#button2").click(function(){
        $("#field2").toggle();
    });
    $("#button3").click(function(){
        $("#field3").toggle();
    });
    $("#button4").click(function(){
        $("#field4").toggle();
    });
    $("#button5").click(function(){
        $("#field5").toggle();
    });
    $("#button6").click(function(){
        $("#field6").toggle();
    });

});
</script>
    <script type="text/javascript">
            $(function() {

                $('#da-slider').cslider({
                    autoplay : true,
                    bgincrement : 450
                });

            });
        </script>
<!-- Owl Carousel Assets -->
<link href="css/owl.carousel.css" rel="stylesheet">
<script src="js/owl.carousel.js"></script>
        <script>
            $(document).ready(function() {

                $("#owl-demo").owlCarousel({
                    items : 4,
                    lazyLoad : true,
                    autoPlay : true,
                    navigation : true,
                    navigationText : ["", ""],
                    rewindNav : false,
                    scrollPerPage : false,
                    pagination : false,
                    paginationNumbers : false,
                });

            });
        </script>
        
    <link rel="stylesheet" href="fonts/css/font-awesome.min.css">

</head>
<body>

<div class="header_bg1">
<div class="container">
	<div class="row header">
		<div class="logo navbar-left">
			<h1><a href="index.html">Laborat&Oacute;rio de Processamento Mineral e Meio Ambiente</a></h1>
		</div>
		
		<div class="clearfix"></div>
	</div>
	<div class="row h_menu">
		<nav class="navbar navbar-default navbar-left" role="navigation">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		    </div>
		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
                <li><a id="button1">Inserir um membro do laborat&oacute;rio</a></li>
                <li><a id="button4">Deletar um membro</a></li>
                <!--
                <li><a id="button2">Inserir um artigo</a></li>
                <li><a id="button3">Deletar um artigo</a></li>
                <li><a id="button4">Deletar um membro</a></li>
                <li><a id="button5">Inserir um evento</a></li>
                <li><a id="button6">Deletar um evento</a></li>-->
		        <li><a href="php/logout.php">Logout</a></li>
		       
		      </ul>
		    </div><!-- /.navbar-collapse -->
		    <!-- start soc_icons -->
		</nav>
		
	</div>
	<div class="clearfix"></div>
</div>
</div>
<?php

    session_start();
 
//Caso o usuário não esteja autenticado, limpa os dados e redireciona
if ( !isset($_SESSION['usuario']) and !isset($_SESSION['password']) ) {
    //Destrói
    session_destroy();
 
    //Limpa
    unset ($_SESSION['usuario']);
    unset ($_SESSION['password']);
     
    //Redireciona para a página de autenticação
    header('location:index.html');
}

    ?>
<div  class="main_bg">
<div class="container">
		<div class="technology row">
			<h1>Manuten&ccedil;&atilde;o</h1>

        <form method="post" enctype="multipart/form-data" action="php/inserir_membro.php">
        
            <fieldset id="field1">
                
                <legend>Inserir um membro do laborat&oacute;rio</legend>
                <p>
                    <label for="name">Nome:</label> 
                    <input type="text" id="nome" name="nome" />
                </p>
                <p>
                    <label>Email:</label> 
                    <input type="text" id="email" name="email" />
                </p>
 				<p>
                    <label>Descricao:</label> 
                    <input type="text" id="descricao" name="descricao" />
                </p>
                <p>
                    <label>Descricao em Inglês:</label> 
                    <input type="text" id="descricao_ing" name="descricao_ing" />
                </p>
                 <p>
                    <label>Lattes:</label> 
                    <input type="text" id="lattes" name="lattes" />
                </p>
                <p>
                    <label>Classificação:</label> 
                    <input type="text" id="classificacao" name="classificacao" />
                </p>
                Selecione uma imagem: <input name="arquivo" type="file" />
                <br />
                <input type="submit" value="Salvar" />
            </fieldset>

        </form>
        		
		<form id="login" action="php/excluir_m.php" data-ajax="false" method="POST">
            <fieldset id="field4">
                <legend>Excluir um membro do laborat&oacute;rio</legend>
                <p>
                    <label for="lates">Lattes:</label> 
                    <input type="text" id="lattes_m" name="lattes_m" />
                <input type="submit" value="Deletar" />
            </fieldset>
        </form>
        <form method="post" enctype="multipart/form-data" action="php/inserir_artigo.php">
            <fieldset id="field2">
                <legend>Inserir um artigo</legend>
                <p>
                    <label>Titulo:</label> 
                    <input type="text" id="title" name="title" />
                </p>
                <p>
                    <label>Autores:</label> 
                    <input type="text" id="autores" name="autores" />
                </p>
 				Selecione um artigo: <input name="arquivo" type="file" />
                <br />
                <input type="submit" value="Salvar" />
            </fieldset>
        </form>


        <form id="login" action="php/excluir_a.php" data-ajax="false" method="POST">
            <fieldset id="field3">
                <legend>Deletar um artigo</legend>
                <p>
                    <label for="name">Titulo do artigo:</label> 
                    <input type="text" id="title" name="title" />
                </p>
                <input align="center" type="submit" value="Deletar"/>
            </fieldset>
        </form>

        <form id="login" action="php/inserir_evento.php" data-ajax="false" method="POST">
            <fieldset id="field5">
                <legend>Inserir um evento</legend>
                <p>
                    <label for="name">Nome do Evento:</label> 
                    <input type="text" id="nome_evento" name="nome_evento" />
                </p>
                <p>
                    <label for="name">Data:</label> 
                    <input type="text" id="data" name="data" />
                </p>
                <p>
                    <label for="name">Endereço:</label> 
                    <input type="text" id="webpage" name="webpage" />
                </p>
                <input type="submit" value="Inserir"/>
            </fieldset>
        </form>

        <form id="login" action="php/deletar_evento.php" data-ajax="false" method="POST">
            <fieldset id="field6">
                <legend>Deletar um evento</legend>
                <p>
                    <label for="name">Nome do Evento:</label> 
                    <input type="text" id="nome_evento" name="nome_evento" />
                </p>
                <input type="submit" value="Deletar"/>
            </fieldset>
        </form>
		</div>
	</div>
</div>



<div class="footer_bg"><!-- start footer -->
	<div class="container">
		<div class="row  footer">
			<div class="copy text-center">
				
			</div>
		</div>
	</div>
</div>
</body>
</html>