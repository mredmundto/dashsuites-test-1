# Admin Panel

This is the admin panel written in react-native and is currently working on Android and iOS. We focus on the development for Android first.

To run the Android version
```
git clone https://github.com/altitudelabs/dashsuites-android.git
cd dashsuites-andriod
npm install
```
Connect an Android device or run an Andriod emulator.

For Android emulator, you can use Andriod Studio:  

Menu bar => Tools => Android => AVD Manager => +Create Virtual Device (bottom left)

Check the android phone connection or emulator by typing
```
adb devices
```
You should see something like below:
```
➜  test git:(master) ✗ adb devices
List of devices attached
emulator-5554	device
```
You will need to setup the environment variable by typing the below every time you open the terminal or you can include in your bash (see the link at the end from Facebook)
```
export ANDROID_HOME=~/Library/Android/sdk
```

Then type
```
react-native run-android
react-native link 
```

For iOS, after installation, you can run that by typing
```
react-native run-ios
react-native link 
```

Below is the documentation from Facebook on setting that up react-native
https://facebook.github.io/react-native/docs/getting-started.html


# Generating a signed APK
Follow the instructions in https://facebook.github.io/react-native/docs/signed-apk-android.html

In case you cannot find the apk after ./gradlew step, run:
```
curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"
```

When installing the apk on the device, make sure the development app is already uninstalled.
