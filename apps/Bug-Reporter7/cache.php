<?php
header('Content-Type: text/cache-manifest');
$filesToCache = array(
	'./index.html',
	
	'./css/framework7.css',
	'./css/framework7.themes.css',
	'./css/bugreporter7.less.css',
	
	'./frames/bugs/bugs-archived.html',
	'./frames/bugs/bugs-closed.html',
	'./frames/bugs/bugs-open.html',
	'./frames/settings/index.html',
	'./frames/settings/about/index.html',
	'./frames/settings/about/license.html',
	'./frames/settings/design/theme.html',
	'./frames/settings/design/tint.html',
	'./frames/settings/design/timed-theme-schedule.html',
	'./frames/settings/update/index.html',
	'./frames/settings/update/update-detail.html',
	'./frames/getting-started.html',
	'./frames/getting-started~ipad.html',

	'./img/demo_groups.png',
	'./img/demo_notifications.png',
	'./img/demo_overview.png',
	'./img/demo_submit.png',
	'./img/demo_themes.png',
	'./img/demo_timed-theme.png',
	'./img/demo_universal.png',
	'./img/bug_1.png',
	'./img/bug_1@2x.png',
	'./img/ios8.png',
	'./iTunesArtwork.png',

	'./js/bugreporter7.js',
	'./js/cookies.js',
	'./js/framework7.min.js',
	'./js/jquery.js'
);
?>
CACHE MANIFEST

CACHE:
<?php
// Print files that we need to cache and store hash data
$hashes = '';
foreach($filesToCache as $file) {
	echo $file."\n";
	$hashes.=md5_file($file);
};
?>

NETWORK:
*
update.json

EXTERNAL:
update.json

# Hash Version: <?=md5($hashes)?>
# Update Hash: <?=md5_file("./update.json")?>