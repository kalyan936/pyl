[app]
title = Python Learning App
package.name = pylearning
package.domain = org.example

source.dir = .
source.include_exts = py,png,jpg,kv,atlas

version = 0.1

requirements = python3,kivy

orientation = portrait
fullscreen = 0

android.permissions = INTERNET,WRITE_EXTERNAL_STORAGE,READ_EXTERNAL_STORAGE
android.api = 31
android.minapi = 21
android.ndk = 25b
android.accept_sdk_license = True

# Use prebuilt recipes
android.private_storage = True
android.entrypoint = org.renpy.android.PythonActivity
android.bootstrap = sdl2

[buildozer]
log_level = 2
warn_on_root = 1
