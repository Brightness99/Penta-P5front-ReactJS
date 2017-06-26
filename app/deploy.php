<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);
define('PRINTI_GIT_DEPLOY_KEY', 'dbcce62704cc4613f7c029b3b9573f49');

// 1. Validate auto deploy secret key
$adsk = filter_input(INPUT_GET, 'adsk');
if (!$adsk || $adsk !== PRINTI_GIT_DEPLOY_KEY) {
    die('permission denied');
}
$tz = date_default_timezone_get();
$dt = date('r T');

// update working copy/get latest repo changes
$cmdIn1 = 'git -C /var/www/html/ pull origin dev 2>&1; git status';
// get details about last commit
$cmdIn2 = 'git rev-parse --abbrev-ref HEAD 2>&1';
$cmdIn3 = 'git log -1 2>&1';

// Post-deploy scripts
$npmCommands = [
    'sudo npm run postmerge',
    'sudo npm run build',
];

$st1 = $st2 = $st3 = $st4 = 0;
exec($cmdIn1, $cmdOut1, $st1);
$output1 = implode("\n", $cmdOut1);
exec($cmdIn2, $cmdOut2, $st2);
$output2 = implode("\n", $cmdOut2);
exec($cmdIn3, $cmdOut3, $st3);
$output3 = implode("\n", $cmdOut3);

$npmOut = array();
$npmSt  = array();

foreach ($npmCommands as $key => $command) {
    exec($command, $npmOut[$key], $npmSt[$key]);
    $npmOut[$key] = implode("\n", $npmOut[$key]);
}

echo "
<pre>
Timezone: {$tz}
DateTime: {$dt}
Current Branch : {$output2}
Command : {$cmdIn1}
Return  : {$st1}
Output  :
**********************************
{$output1}
**********************************
Last Commit info  :
**********************************
{$output3}
*********************************
NPM deploy script :
**********************************
" . print_r($npmOut, true) . "
**********************************</pre>
";
