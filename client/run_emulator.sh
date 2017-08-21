#!/bin/bash

emulator -avd Nexus_5X_API_23_x86 &
sleep 30
react-native run-android
