$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net.Http
$baseUrl = if ($env:CLIMACIDADAO_API_URL) { $env:CLIMACIDADAO_API_URL.TrimEnd('/') } else { 'http://127.0.0.1:5080' }
$client = [System.Net.Http.HttpClient]::new()
$passed = 0

function Assert-True([bool]$condition, [string]$message) {
  if (-not $condition) { throw "FALHOU: $message" }
  $script:passed++
  Write-Host "APROVADO: $message"
}

function Send-Json([string]$path, [string]$method, $body = $null) {
  $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::new($method), "$baseUrl$path")
  if ($null -ne $body) {
    $json = $body | ConvertTo-Json -Compress
    $request.Content = [System.Net.Http.StringContent]::new($json, [Text.Encoding]::UTF8, 'application/json')
  }
  $response = $client.SendAsync($request).GetAwaiter().GetResult()
  $text = $response.Content.ReadAsStringAsync().GetAwaiter().GetResult()
  [pscustomobject]@{ Status = [int]$response.StatusCode; Body = $text }
}

try {
  $health = Send-Json '/health' 'GET'
  Assert-True ($health.Status -eq 200) 'Health retorna HTTP 200'

  $valid = Send-Json '/api/v1/readings' 'POST' @{
    temperatureC = 35; humidityPercent = 70; source = 'qa-script'; neighborhood = 'Bela Vista'
  }
  Assert-True ($valid.Status -eq 201) 'TC07 cria leitura válida com HTTP 201'

  $invalid = Send-Json '/api/v1/readings' 'POST' @{
    temperatureC = 35; humidityPercent = 150; source = 'qa-script'; neighborhood = 'Bela Vista'
  }
  Assert-True ($invalid.Status -eq 400) 'TC08 rejeita umidade inválida com HTTP 400'

  $filtered = Send-Json '/api/v1/readings?neighborhood=Bela%20Vista&limit=20' 'GET'
  $items = $filtered.Body | ConvertFrom-Json
  Assert-True ($filtered.Status -eq 200 -and @($items).Count -gt 0 -and @($items | Where-Object neighborhood -ne 'Bela Vista').Count -eq 0) 'TC09 filtra leituras por bairro'

  $report = Send-Json '/api/v1/reports' 'POST' @{
    category = 'sem-sombra'; neighborhood = 'Bela Vista'; description = 'Ponto sem cobertura durante a tarde.'
  }
  Assert-True ($report.Status -eq 201) 'TC04 aceita relato anônimo válido'

  $pii = Send-Json '/api/v1/reports' 'POST' @{
    category = 'outro'; neighborhood = 'Bela Vista'; description = 'Meu CPF fictício é 123.456.789-00.'
  }
  Assert-True ($pii.Status -eq 400) 'TC06 rejeita relato contendo PII'

  $points = Send-Json '/api/v1/safe-points?accessible=true' 'GET'
  $pointItems = $points.Body | ConvertFrom-Json
  Assert-True ($points.Status -eq 200 -and @($pointItems).Count -gt 0 -and @($pointItems | Where-Object isAccessible -eq $false).Count -eq 0) 'TC03 retorna somente pontos acessíveis'

  Write-Host "TOTAL: $passed testes de API aprovados, 0 falhas."
} finally {
  $client.Dispose()
}

