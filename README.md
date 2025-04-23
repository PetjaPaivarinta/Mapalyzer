# Mapalyzer
Examine and look at 3D maps, imported with .gpx

# Build from source

To run the code from source you need to follow these simple steps:

## 1: fix "C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system" bug
run 'Set-ExecutionPolicy -Scope CurrentUser'
then type 'RemoteSigned'

## 2: install dependencies

run 'npm i' to install all dependencies of the project

## 3: do the initial build phase

run 'npm run build' to create the out folder.

## 4: run the build for your desired platform
i.e if you want a windows executable, you run 'npm run build:win', change win with mac for macOs, and with lin for linux distributables.
