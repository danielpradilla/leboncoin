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
    <!-- Nav tabs -->
      <ul id="mytab" class="nav nav-tabs" role="tablist">
        <li class="active"><a href="#location" role="tab" data-toggle="tab">Location</a></li>
        <li><a href="#annonces" role="tab" data-toggle="tab">Annonces</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="location">
            <div class="panel-body">
              <?php include('formlocation.php'); ?>
            </div>
        </div>
        <div class="tab-pane" id="annonces">
            <div class="panel-body">
              <?php include('formannonces.php'); ?>
            </div>
        </div>
      </div>
      <hr/>
    </div>
    <div class="ad">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <!-- wide leaderboard -->
      <ins class="adsbygoogle"
           style="display:inline-block;width:728px;height:90px"
           data-ad-client="ca-pub-8199696010752089"
           data-ad-slot="3189133856"></ins>
      <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    </div>
    <div id="results" class="container">
	    		<?php include('results.php') ?>
    </div>

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="js/functions.js"></script>
    <?php if (file_exists('footer.php')) {
      include('footer.php');
    }?>
  </body>
</html>