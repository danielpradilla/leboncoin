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
      <label for="location" class="col-md-3 control-label">Code Postal
      </label>
      <div class="col-md-7">
        <input type="text" class="form-control" id="location" name="location" placeholder="Códigos postales separados por coma" value="<?php echo getArg('location'); ?>">
      </div>
      <a class="explanation" target="_blank" href="http://www.freemaptools.com/find-french-postcodes-inside-radius.htm">Carte 1</a>
      <a class="explanation" target="_blank" href="http://atlas.cosmosia.com/">Carte 2</a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-10 form-group">
        <label for="f1" class="radio-inline">
          <input type="radio" name="f" id="f1" value=""  <?php echo (getArg('f')=='') ? 'checked="true"' : ''; ?> >
          Toutes
        </label>
        <label for="f2" class="radio-inline">
          <input type="radio" name="f" id="f2" value="p" <?php echo (getArg('f')=='p') ? 'checked="true"' : ''; ?>>
          Particuliers
        </label>
        <label  for="f3" class="radio-inline">
          <input type="radio" name="f" id="f3" value="c" <?php echo (getArg('f')=='c') ? 'checked="true"' : ''; ?>>
          Professionels
        </label>
    </div>
    <input type="hidden" id="adtype" name="adtype" value="location">
    <button type="submit" class="btn btn-success">Chercher</button>
  </div>
</form>
