$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$venv = Join-Path $root '.venv-ml'
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) { throw 'Instale Python 3.11 ou superior e execute novamente.' }
if (-not (Test-Path $venv)) { & $python.Source -m venv $venv }
$venvPython = Join-Path $venv 'Scripts\python.exe'
& $venvPython -m pip install -r (Join-Path $PSScriptRoot 'requirements.txt')
& $venvPython (Join-Path $PSScriptRoot 'baixar_dados.py')
Push-Location $PSScriptRoot
try {
  & $venvPython -m jupyter nbconvert --to notebook --execute --inplace --ExecutePreprocessor.timeout=900 clima_cidadao.ipynb
} finally { Pop-Location }
Write-Output 'Notebook executado. Revise as métricas e atualize RELATORIO_ML.md.'
