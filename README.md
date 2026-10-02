#LinkUp

A modern mobile chat and calling application built with React Native and Expo. LinkUp allows users to connect through real-time messaging, audio/video calls, profiles, LinkUp IDs, and privacy controls.



## 📱 Android APK

Download the latest Android APK:

[![Download APK](https://img.shields.io/badge/Download-Android%20APK-brightgreen?style=for-the-badge&logo=android)](https://expo.dev/accounts/mobile-dev-pro/projects/LinkUp-chatapp/builds/49738ccc-5afe-475e-b180-dc91fa912d81)


## Features

* 🔐 User authentication with Supabase
* 💬 Real-time messaging with Stream Chat
* 📞 Audio calling
* 🎥 Video calling
* 🔔 Incoming call notifications with Firebase FCM
* 👤 User profiles
* 🆔 Unique LinkUp ID for finding users
* 🔎 Search users by LinkUp ID
* 🚫 Block and unblock users
* 🔑 Change password
* 🖼️ Profile photo support
* 🌐 Internet connection detection
* 📱 Responsive mobile UI
* 💾 Local storage for blocked-user data
* ☁️ Supabase-powered profile and authentication system
* 🎨 Light, clean mobile interface

## Tech Stack

* React Native
* Expo
* Expo Router
* JavaScript
* React Native Paper
* Supabase
* Stream Chat
* Stream Video
* Firebase Cloud Messaging
* AsyncStorage
* React Native WebRTC

## Architecture

LinkUp uses different services for different responsibilities:


### Supabase

Used for:

* Authentication
* User profiles
* LinkUp IDs
* Profile images
* User account data

### Stream

Used for:

* Real-time chat
* Audio calls
* Video calls
* Call signaling
* Call-related functionality

### Firebase

Used for:

* Android push notifications
* Incoming call notifications through FCM



## Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
EXPO_PUBLIC_STREAM_API_KEY=
```

Use your own project credentials for each variable.

> Never commit your `.env` file or Firebase configuration containing sensitive project credentials to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/Amna-Coder404/LinkUp-chatapp.git
cd LinkUp-chatapp
npm install
npx expo start
```



## Privacy & Security

LinkUp keeps authentication and profile data in Supabase while real-time communication is handled through Stream.

Local configuration files and Firebase configuration should not be committed to the repository.

Make sure to configure your own:

* Supabase project
* Stream project
* Firebase project
* Android application credentials

## Current Status

LinkUp is an actively developed mobile application.

Current development focuses on:

* Chat experience
* Audio/video calling
* Call history
* Push notifications
* User privacy controls
* Profile management
* Offline/network handling

