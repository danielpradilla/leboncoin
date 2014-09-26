<?php include_once('inc/functions.php'); 
  setArgs();
?>
<form name="searchform" role="form" method="post">
  <div class="row">

    <div class="col-md-5 form-group">
      <label for="q" class="col-md-3 control-label">Query</label>
      <div class="col-md-9">
        <input type="text" class="form-control" id="q" name="q" placeholder="Mots pour la recherche" value="<?php echo getArg('q'); ?>">
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
    <input type="hidden" id="adtype" name="adtype" value="announces">
    <button type="submit" class="btn btn-success pull-right">Chercher</button>
  </div>
</form>
