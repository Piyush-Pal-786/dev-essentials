@echo off
title ATS Resume Generator

where node >nul 2>&1
IF ERRORLEVEL 1 (
    echo.
    echo  Node.js is not installed.
    echo  Please download and install it from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo.
echo  Installing dependencies (first run only)...
call npm install --silent

echo.
echo  Starting ATS Resume Generator...
echo  Opening http://localhost:5173 in your browser...
echo.

start "" "http://localhost:5173"
call npm run dev

pause
