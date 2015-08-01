<?php
header('Content-Type: text/cache-manifest');
$filesToCache = array(
    './index.html', 
    './js/todo7.js', 
    './css/todo7.css', 
    './img/bg.jpg', 
    '../../dist/js/framework7.min.js', 
    '../../dist/css/framework7.ios.min.css'
    '../../dist/css/framework7.ios.colors.min.css'
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

# Hash Version: <?=md5($hashes)?>