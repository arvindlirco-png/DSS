$ErrorActionPreference = 'Stop'
$siteUrl = 'http://127.0.0.1:5180'
$projectPath = $PSScriptRoot

function Test-SamajWebsite {
    try {
        $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 2
        if ($response.Content -notmatch 'Dehgam Shahar Sanatan Samaj') {
            throw 'Port 5180 is being used by another website.'
        }
        return $true
    } catch [System.Net.WebException] {
        return $false
    }
}

try {
    if (-not (Test-SamajWebsite)) {
        $nodePath = (Get-Command node.exe -ErrorAction Stop).Source
        $vitePath = Join-Path $projectPath 'node_modules\vite\bin\vite.js'
        if (-not (Test-Path -LiteralPath $vitePath)) {
            throw 'Dependencies are missing. Run Start-Website.cmd once, then try this shortcut again.'
        }
        $serverProcess = Start-Process -FilePath $nodePath -ArgumentList @(
            ('"{0}"' -f $vitePath), '--host', '127.0.0.1', '--port', '5180', '--strictPort'
        ) -WorkingDirectory $projectPath -WindowStyle Hidden -PassThru
        $ready = $false
        for ($attempt = 0; $attempt -lt 30; $attempt++) {
            Start-Sleep -Milliseconds 500
            if (Test-SamajWebsite) { $ready = $true; break }
            if ($serverProcess.HasExited) { break }
        }
        if (-not $ready) {
            throw 'The website could not start. Run Start-Website.cmd to see the error details.'
        }
    }
    Start-Process $siteUrl
} catch {
    $popup = New-Object -ComObject WScript.Shell
    $null = $popup.Popup($_.Exception.Message, 0, 'Dehgam Samaj website', 16)
    exit 1
}
