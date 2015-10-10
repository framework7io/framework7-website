<?php
$url = $_GET['url'];
if (strpos($url, 'http') === false) {
    echo strpos($url, 'http');
    die('');

}
if (strpos($url, 'idangero') > 0) {
    die('');
}
echo file_get_contents($url);
?>