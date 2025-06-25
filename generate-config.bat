@echo off
setlocal

for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R "IPv4"') do (for /f "tokens=* delims=" %%B in ("%%A") do set LOCAL_IP=%%B)

echo IP detectado: %LOCAL_IP%

set CONFIG_PATH=.\frontend_psicoapp\config.js
echo export const API_URL = 'http://%LOCAL_IP%:5000'; > %CONFIG_PATH%