<?php include_once('inc/functions.php'); 
  setArgs();
?>
<form name="searchform" role="form" method="post">
  <div class="row">

    <div class="col-md-5 form-group">
      <label for="mrs" class="col-md-4 control-label">Loyer entre</label>
      <div class="col-md-3">
        <input type="text" class="form-control" id="mrs" name="mrs" placeholder="Mín" value="<?php echo getArg('mrs'); ?>">
      </div>
      <label for="mre" class="col-md-1 control-label">et</label>
      <div class="col-md-3">
        <input type="text" class="form-control" id="mre" name="mre" placeholder="Máx" value="<?php echo getArg('mre'); ?>">
      </div>
    </div>

    <div class="location col-md-7 form-group">
      <label for="city" class="col-md-3 control-label">Code Postal
      </label>
      <div class="col-md-7">
        <input type="text" class="form-control" id="city" name="city" placeholder="Códigos postales separados por coma" value="<?php echo getArg('city'); ?>">
      </div>
      <a class="explanation" target="_blank" href="http://www.freemaptools.com/find-french-postcodes-inside-radius.htm">Carte 1</a>
      <a class="explanation" target="_blank" href="http://atlas.cosmosia.com/">Carte 2</a>
    </div>
  </div>
  <div class="row">
    <div class="pull-right">
      <input type="hidden" id="adtype" name="adtype" value="location">
      <button type="submit" class="btn btn-success">Chercher</button>
    </div>
  </div>
</form>
