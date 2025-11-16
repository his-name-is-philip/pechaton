# Script to rename phamilypharma.com to pechaton
# Run this after closing Cursor

$oldPath = "C:\Users\sokol_40x7caj\phamilypharma.com"
$newPath = "C:\Users\sokol_40x7caj\pechaton"

if (Test-Path $oldPath) {
    try {
        Rename-Item -Path $oldPath -NewName "pechaton"
        Write-Host "Directory renamed successfully!" -ForegroundColor Green
        Write-Host "Old path: $oldPath" -ForegroundColor Yellow
        Write-Host "New path: $newPath" -ForegroundColor Green
    }
    catch {
        Write-Host "Error: Could not rename directory. Make sure Cursor is closed and the directory is not in use." -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}
else {
    Write-Host "Directory not found at: $oldPath" -ForegroundColor Red
}

