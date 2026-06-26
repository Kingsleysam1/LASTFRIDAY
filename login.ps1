$env:Path = "d:\btl-project\btl\node\node-v20.11.1-win-x64;" + $env:Path
Write-Host "Starting Vercel Login..." -ForegroundColor Cyan
Write-Host "Please follow the prompts to log in via your browser." -ForegroundColor Yellow
vercel.cmd login
Write-Host "Login complete! Press any key to exit." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
