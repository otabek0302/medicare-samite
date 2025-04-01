#!/bin/sh

# Create a packages
mkdir ./packages

# Unzip the archive
git add -A ./packages/api
unzip -o ./SourceFile/medicareapi.zip -d ./packages/api
git add -A ./packages/api

# Move files to mono repository
mkdir -p ./packages/web-front
git add -A ./packages/web-front
git mv ./SourceFile/medicare-web-app ./packages/web-front || echo "web-app already moved"
cp -pR ./SourceFile/medicare-web-app/* ./packages/web-front

mkdir -p ./packages/web-admin
git add -A ./packages/web-admin
git mv ./SourceFile/medicare-admin-panel ./packages/web-admin || echo "web-admin already moved"
cp -pR ./SourceFile/medicare-admin-panel/* ./packages/web-admin
# This trick is temporarily due of files tree bug
cp -pR ./SourceFile/medicare-admin-panel/medicare-admin-panel/* ./packages/web-admin
rm -rf ./packages/web-admin/medicare-admin-panel

mkdir -p ./packages/app-doctor
git add -A ./packages/app-doctor
git mv ./SourceFile/doctorapp ./packages/app-doctor || echo "app-doctor already moved"
cp -pR ./SourceFile/doctorapp/* ./packages/app-doctor

mkdir -p ./packages/app-user
git add -A ./packages/app-user
git mv ./SourceFile/Medicare_User_App ./packages/app-user || echo "app-user already moved"
cp -pR ./SourceFile/Medicare_User_App/* ./packages/app-user

mkdir -p ./docs
git add -A ./docs
git mv ./Documentation ./docs || echo "docs already moved"
cp -pR ./Documentation/* ./docs

mkdir -p ./docs/api
git mv ./SourceFile/Postman_Api ./docs/api || echo "docs api already moved"
cp -pR ./SourceFile/Postman_Api/* ./docs/api

# Remove files
git rm --cached -r ./Documentation
rm -rf ./Documentation

git rm --cached ./SourceFile/medicareapi.zip
rm ./SourceFile/medicareapi.zip

git rm --cached -r ./SourceFile
rm -rf ./SourceFile

# Find and remove ghost files
find . -iname '._*' -exec rm {} +
find . -iname '.DS_Store' -exec rm {} +

# Find an remove old legacy lock-files
find . -iname 'package-lock.json' -exec rm {} +

# Format codebase
bun run prettier -c . --write
