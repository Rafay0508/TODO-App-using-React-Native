@echo off
"C:\\Users\\AA\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\cmake.exe" ^
  "-HC:\\Users\\AA\\Desktop\\code\\newApp\\node_modules\\react-native\\ReactAndroid\\cmake-utils\\default-app-setup" ^
  "-DCMAKE_SYSTEM_NAME=Android" ^
  "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON" ^
  "-DCMAKE_SYSTEM_VERSION=24" ^
  "-DANDROID_PLATFORM=android-24" ^
  "-DANDROID_ABI=x86_64" ^
  "-DCMAKE_ANDROID_ARCH_ABI=x86_64" ^
  "-DANDROID_NDK=C:\\Users\\AA\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_ANDROID_NDK=C:\\Users\\AA\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_TOOLCHAIN_FILE=C:\\Users\\AA\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125\\build\\cmake\\android.toolchain.cmake" ^
  "-DCMAKE_MAKE_PROGRAM=C:\\Users\\AA\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
  "-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\\Users\\AA\\Desktop\\code\\newApp\\android\\app\\build\\intermediates\\cxx\\RelWithDebInfo\\b6e144b4\\obj\\x86_64" ^
  "-DCMAKE_RUNTIME_OUTPUT_DIRECTORY=C:\\Users\\AA\\Desktop\\code\\newApp\\android\\app\\build\\intermediates\\cxx\\RelWithDebInfo\\b6e144b4\\obj\\x86_64" ^
  "-DCMAKE_BUILD_TYPE=RelWithDebInfo" ^
  "-DCMAKE_FIND_ROOT_PATH=C:\\Users\\AA\\Desktop\\code\\newApp\\android\\app\\.cxx\\RelWithDebInfo\\b6e144b4\\prefab\\x86_64\\prefab" ^
  "-BC:\\Users\\AA\\Desktop\\code\\newApp\\android\\app\\.cxx\\RelWithDebInfo\\b6e144b4\\x86_64" ^
  -GNinja ^
  "-DPROJECT_BUILD_DIR=C:\\Users\\AA\\Desktop\\code\\newApp\\android\\app\\build" ^
  "-DREACT_ANDROID_DIR=C:\\Users\\AA\\Desktop\\code\\newApp\\node_modules\\react-native\\ReactAndroid" ^
  "-DANDROID_STL=c++_shared" ^
  "-DANDROID_USE_LEGACY_TOOLCHAIN_FILE=ON"