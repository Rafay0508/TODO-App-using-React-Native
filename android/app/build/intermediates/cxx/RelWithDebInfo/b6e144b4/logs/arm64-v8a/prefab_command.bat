@echo off
"C:\\Program Files\\Microsoft\\jdk-17.0.13.11-hotspot\\bin\\java" ^
  --class-path ^
  "C:\\Users\\AA\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  arm64-v8a ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  26 ^
  --output ^
  "C:\\Users\\AA\\AppData\\Local\\Temp\\agp-prefab-staging17072993502499407901\\staged-cli-output" ^
  "C:\\Users\\AA\\.gradle\\caches\\8.10.2\\transforms\\53a328e47e4f184d51b68146fa2ee70a\\transformed\\react-android-0.76.3-release\\prefab" ^
  "C:\\Users\\AA\\.gradle\\caches\\8.10.2\\transforms\\1383fcf8557c5ed321a45a1c3467a80f\\transformed\\hermes-android-0.76.3-release\\prefab" ^
  "C:\\Users\\AA\\.gradle\\caches\\8.10.2\\transforms\\ee4713c89dc69faa668500deaee892a4\\transformed\\fbjni-0.6.0\\prefab"
