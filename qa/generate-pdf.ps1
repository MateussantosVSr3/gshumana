$ErrorActionPreference='Stop'
$browser='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$html=(Resolve-Path "$PSScriptRoot\RELATORIO_QA_FINAL.html").Path -replace '\\','/'
$out=Join-Path $PSScriptRoot 'RELATORIO_QA.pdf'
$profile=Join-Path $env:TEMP 'climacidadao-edge-pdf'
& $browser --headless=new --disable-gpu --disable-gpu-compositing --disable-software-rasterizer --no-first-run --no-sandbox --user-data-dir="$profile" --print-to-pdf="$out" "file:///$html"
Start-Sleep -Seconds 2
if(-not (Test-Path $out)){ throw 'PDF não foi gerado' }
Write-Output $out
