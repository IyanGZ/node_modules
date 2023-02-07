#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
$ret=0
if (Test-Path "$basedir/node$exe") {
  & "$basedir/node$exe"  "$basedir/../json2csv/bin/json2csv.js" $args
  $ret=$LASTEXITCODE
} else {
  & "node$exe"  "$basedir/../json2csv/bin/json2csv.js" $args
  $ret=$LASTEXITCODE
}
exit $ret
