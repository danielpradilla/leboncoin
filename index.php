<?php include_once('inc/functions.php');?>
<!DOCTYPE html>
<html>
  <head>
    <title>Le Bon Coin query</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
  	<div class="container">
  		<div class="panel  panel-default">
  			<div class="panel-body">
		    	<?php include('searchform.php'); ?>
		    </div>
	    </div>
    </div>
    <div id="results" class="container">
	    		<?php include('results.php') ?>
    </div>

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="js/functions.js"></script>
  </body>
</html>