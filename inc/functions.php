<?php
/*
this thing uses composer
curl -sS https://getcomposer.org/installer | php
and goute
php composer.phar require fabpot/goutte:~2.0
and bower
*/
session_start();
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

require 'vendor/autoload.php';


function setArgs(){
	foreach ( $_POST as $key=>$value ) {
	    if ( !empty($value) ) {
	        $_SESSION['args'][$key] = $value;
	    }
	}
	foreach ($_GET as $key=>$value) {
		if ( !empty($value) ) {
	        $_SESSION['args'][$key] = $value;
	    }
	}	
}

function getArg($arg) {
	return isset($_SESSION['args'][$arg]) ? $_SESSION['args'][$arg] : getDefaults($arg) ;
}

function getDefaults($arg) {
	$DEFAULTS=array();
	if (file_exists('defaults.php')) {
		include('defaults.php');
	}
	return ($DEFAULTS[$arg] ? $DEFAULTS[$arg] : '');
}



function getResults() {
    $results=array();

	$goutte = new Goutte\Client();
    $baseURL = 'http://www.leboncoin.fr/';

    $locations = split(',',getArg('location'));

    foreach($locations as $location) {
    	$location=trim($location);
	
	    $urlEndpoint = 'locations/offres/?f=a&th=1'
	    				.'&mrs='.getArg('mrs')
	    				.'&mre='.getArg('mre')
	    				.'&location='.$location 
	    				. (getArg('f')!='' ? '&f='.getArg('f') : '');

	    $selector = '.list-lbc';

	    $crawler = $goutte->request('GET', $baseURL . $urlEndpoint);

	    $results[$location] = $crawler->filter($selector)->each(function ($node, $i) {
	        return $node;	// This is a DOMElement Object
	    });
    }
	return $results;

}

function printResults($results) {
	foreach($results as $key=>$nodes) {
		echo '<div class="panel  panel-default" id="panel-'.$key.'">';
		echo '<div class="panel-heading">
				<h4><span class="postal-code">'.$key.'</span>
					<span class="city"></span>
				</h4>
				</div>';
		echo '<div class="panel-body">';
		foreach($nodes as $node) {
			echo $node->html();
		}
		echo '</div>';
		echo '</div>';
	}
}


?>