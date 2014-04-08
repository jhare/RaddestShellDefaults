#!/bin/sh
nm-applet&
ck-launch-session&
#exec gnome-session # ck-launch-session is advised for the dbus stuff to work fine.
