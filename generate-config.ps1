$ip = (Get-NetIPAddress -AddressFamily IPv4 `
    | Where-Object {$_.InterfaceAlias -notmatch 'Loopback|Virtual|VMware'}`
    | Select-Object -First 1).IPAddress

$configPath = ".\frontend_psicoapp\config.js"

$configContent = "export const API_URL = 'http://${ip}:5000';"

Set-Content -Path $configPath -Value $configContent

Write-Host "Arquivo $configPath gerado com IP: $ip"