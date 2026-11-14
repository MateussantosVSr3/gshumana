$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$venv = Join-Path $root '.venv-ml'
$python = Get-Command python -ErrorAction SilentlyContinue
$uv = Get-Command uv -ErrorAction SilentlyContinue

if (-not (Test-Path $venv)) {
  if ($uv) {
    & $uv.Source venv $venv --python 3.11
  } elseif ($python) {
    & $python.Source -m venv $venv
  } else {
    throw 'Instale Python 3.11 ou o gerenciador uv e execute novamente.'
  }
}

$venvPython = Join-Path $venv 'Scripts\python.exe'
if ($uv) {
  & $uv.Source pip install --python $venvPython -r (Join-Path $PSScriptRoot 'requirements.txt')
} else {
  & $venvPython -m pip install -r (Join-Path $PSScriptRoot 'requirements.txt')
}
& $venvPython (Join-Path $PSScriptRoot 'baixar_dados.py')
Push-Location $PSScriptRoot
try {
  & $venvPython -m jupyter nbconvert --to notebook --execute --inplace --ExecutePreprocessor.timeout=900 clima_cidadao.ipynb
} finally { Pop-Location }
Write-Output 'Notebook executado. Revise as métricas e atualize RELATORIO_ML.md.'
