@echo off
cd /d %~dp0..
node scripts/backupDatabase.js
