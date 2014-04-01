-- automatically generated file. Do not edit (see /usr/share/doc/menu/html)

module("debian.menu")

Debian_menu = {}

Debian_menu["Debian_Applications_Accessibility"] = {
	{"Xmag","xmag"},
}
Debian_menu["Debian_Applications_Data_Management"] = {
	{"LibreOffice Base","/usr/bin/libreoffice --base","/usr/share/icons/hicolor/32x32/apps/libreoffice-base.xpm"},
}
Debian_menu["Debian_Applications_Editors"] = {
	{"GVIM","/usr/bin/vim.gtk -g -f","/usr/share/pixmaps/vim-32.xpm"},
	{"MousePad","/usr/bin/mousepad","/usr/share/pixmaps/mousepad.xpm"},
	{"Nano", "x-terminal-emulator -e ".."/bin/nano","/usr/share/nano/nano-menu.xpm"},
	{"Xedit","xedit"},
}
Debian_menu["Debian_Applications_File_Management"] = {
	{"Brasero","/usr/bin/brasero"},
	{"Thunar","/usr/bin/thunar"},
	{"Xfdesktop","xfdesktop"},
}
Debian_menu["Debian_Applications_Graphics"] = {
	{"LibreOffice Draw","/usr/bin/libreoffice --draw","/usr/share/icons/hicolor/32x32/apps/libreoffice-draw.xpm"},
	{"The GIMP","/usr/bin/gimp","/usr/share/pixmaps/gimp.xpm"},
	{"XSane","/usr/bin/xsane","/usr/share/pixmaps/xsane.xpm"},
	{"X Window Snapshot","xwd | xwud"},
}
Debian_menu["Debian_Applications_Network_Communication"] = {
	{"Mutt", "x-terminal-emulator -e ".."/usr/bin/mutt","/usr/share/pixmaps/mutt.xpm"},
	{"Telnet", "x-terminal-emulator -e ".."/usr/bin/telnet"},
	{"Xbiff","xbiff"},
}
Debian_menu["Debian_Applications_Network_Web_Browsing"] = {
	{"Google Chrome","/opt/google/chrome/google-chrome","/opt/google/chrome/product_logo_32.xpm"},
	{"Iceweasel","iceweasel","/usr/share/pixmaps/iceweasel.xpm"},
	{"w3m", "x-terminal-emulator -e ".."/usr/bin/w3m /usr/share/doc/w3m/MANUAL.html"},
}
Debian_menu["Debian_Applications_Network"] = {
	{ "Communication", Debian_menu["Debian_Applications_Network_Communication"] },
	{ "Web Browsing", Debian_menu["Debian_Applications_Network_Web_Browsing"] },
}
Debian_menu["Debian_Applications_Office"] = {
	{"LibreOffice Calc","/usr/bin/libreoffice --calc","/usr/share/icons/hicolor/32x32/apps/libreoffice-calc.xpm"},
	{"LibreOffice Impress","/usr/bin/libreoffice --impress","/usr/share/icons/hicolor/32x32/apps/libreoffice-impress.xpm"},
	{"LibreOffice Writer","/usr/bin/libreoffice --writer","/usr/share/icons/hicolor/32x32/apps/libreoffice-writer.xpm"},
}
Debian_menu["Debian_Applications_Programming"] = {
	{"Python (v2.6)", "x-terminal-emulator -e ".."/usr/bin/python2.6","/usr/share/pixmaps/python2.6.xpm"},
	{"Python (v2.7)", "x-terminal-emulator -e ".."/usr/bin/python2.7","/usr/share/pixmaps/python2.7.xpm"},
	{"Tclsh8.5", "x-terminal-emulator -e ".."/usr/bin/tclsh8.5"},
}
Debian_menu["Debian_Applications_Science_Mathematics"] = {
	{"Bc", "x-terminal-emulator -e ".."/usr/bin/bc"},
	{"Dc", "x-terminal-emulator -e ".."/usr/bin/dc"},
	{"LibreOffice Math","/usr/bin/libreoffice --math","/usr/share/icons/hicolor/32x32/apps/libreoffice-math.xpm"},
	{"Xcalc","xcalc"},
}
Debian_menu["Debian_Applications_Science"] = {
	{ "Mathematics", Debian_menu["Debian_Applications_Science_Mathematics"] },
}
Debian_menu["Debian_Applications_Shells"] = {
	{"Bash", "x-terminal-emulator -e ".."/bin/bash --login"},
	{"Dash", "x-terminal-emulator -e ".."/bin/dash -i"},
	{"Sh", "x-terminal-emulator -e ".."/bin/sh --login"},
}
Debian_menu["Debian_Applications_Sound"] = {
	{"Ex Falso","/usr/bin/exfalso"},
	{"Quod Libet","/usr/bin/quodlibet"},
	{"Xfce Mixer","/usr/bin/xfce4-mixer","/usr/share/pixmaps/xfce4-mixer.xpm"},
}
Debian_menu["Debian_Applications_System_Administration"] = {
	{"Debian Task selector", "x-terminal-emulator -e ".."su-to-root -c tasksel"},
	{"Editres","editres"},
	{"Reportbug", "x-terminal-emulator -e ".."/usr/bin/reportbug --exit-prompt"},
	{"Reportbug (GTK+)","/usr/bin/reportbug --exit-prompt --ui gtk2"},
	{"Xclipboard","xclipboard"},
	{"Xfce Application Finder","xfce4-appfinder","/usr/share/pixmaps/xfce4-appfinder.xpm"},
	{"Xfontsel","xfontsel"},
	{"xfprint4","xfprint4"},
	{"XFrun4","xfrun4"},
	{"Xkill","xkill"},
	{"Xrefresh","xrefresh"},
}
Debian_menu["Debian_Applications_System_Hardware"] = {
	{"Xvidtune","xvidtune"},
}
Debian_menu["Debian_Applications_System_Monitoring"] = {
	{"Pstree", "x-terminal-emulator -e ".."/usr/bin/pstree.x11","/usr/share/pixmaps/pstree16.xpm"},
	{"Top", "x-terminal-emulator -e ".."/usr/bin/top"},
	{"Xconsole","xconsole -file /dev/xconsole"},
	{"Xev","x-terminal-emulator -e xev"},
	{"Xload","xload"},
}
Debian_menu["Debian_Applications_System_Package_Management"] = {
	{"Aptitude Package Manager (text)", "x-terminal-emulator -e ".."/usr/bin/aptitude-curses"},
	{"Synaptic Package Manager","x-terminal-emulator -e synaptic-pkexec","/usr/share/synaptic/pixmaps/synaptic_32x32.xpm"},
}
Debian_menu["Debian_Applications_System"] = {
	{ "Administration", Debian_menu["Debian_Applications_System_Administration"] },
	{ "Hardware", Debian_menu["Debian_Applications_System_Hardware"] },
	{ "Monitoring", Debian_menu["Debian_Applications_System_Monitoring"] },
	{ "Package Management", Debian_menu["Debian_Applications_System_Package_Management"] },
}
Debian_menu["Debian_Applications_Terminal_Emulators"] = {
	{"Xfce Terminal","/usr/bin/xfce4-terminal","/usr/share/pixmaps/terminal.xpm"},
	{"Xfterm4", "x-terminal-emulator -e ".."xfterm4"},
	{"XTerm","xterm","/usr/share/pixmaps/xterm-color_32x32.xpm"},
	{"XTerm (Unicode)","uxterm","/usr/share/pixmaps/xterm-color_32x32.xpm"},
}
Debian_menu["Debian_Applications_Video"] = {
	{"VLC media player","/usr/bin/qvlc","/usr/share/icons/hicolor/32x32/apps/vlc.xpm"},
}
Debian_menu["Debian_Applications_Viewers"] = {
	{"Epdfview","/usr/bin/epdfview","/usr/share/pixmaps/epdfview.xpm"},
	{"Xditview","xditview"},
}
Debian_menu["Debian_Applications"] = {
	{ "Accessibility", Debian_menu["Debian_Applications_Accessibility"] },
	{ "Data Management", Debian_menu["Debian_Applications_Data_Management"] },
	{ "Editors", Debian_menu["Debian_Applications_Editors"] },
	{ "File Management", Debian_menu["Debian_Applications_File_Management"] },
	{ "Graphics", Debian_menu["Debian_Applications_Graphics"] },
	{ "Network", Debian_menu["Debian_Applications_Network"] },
	{ "Office", Debian_menu["Debian_Applications_Office"] },
	{ "Programming", Debian_menu["Debian_Applications_Programming"] },
	{ "Science", Debian_menu["Debian_Applications_Science"] },
	{ "Shells", Debian_menu["Debian_Applications_Shells"] },
	{ "Sound", Debian_menu["Debian_Applications_Sound"] },
	{ "System", Debian_menu["Debian_Applications_System"] },
	{ "Terminal Emulators", Debian_menu["Debian_Applications_Terminal_Emulators"] },
	{ "Video", Debian_menu["Debian_Applications_Video"] },
	{ "Viewers", Debian_menu["Debian_Applications_Viewers"] },
}
Debian_menu["Debian_Games_Toys"] = {
	{"Oclock","oclock"},
	{"Xclock (analog)","xclock -analog"},
	{"Xclock (digital)","xclock -digital -update 1"},
	{"Xeyes","xeyes"},
	{"Xlogo","xlogo"},
}
Debian_menu["Debian_Games"] = {
	{ "Toys", Debian_menu["Debian_Games_Toys"] },
}
Debian_menu["Debian_Help"] = {
	{"Info", "x-terminal-emulator -e ".."info"},
	{"Xfce4-about","xfce4-about"},
	{"Xfhelp4","xfhelp4"},
	{"Xman","xman"},
	{"yelp","/usr/bin/yelp"},
}
Debian_menu["Debian_Screen_Locking"] = {
	{"Lock Screen (XScreenSaver)","/usr/bin/xscreensaver-command -lock"},
	{"Xflock4", "x-terminal-emulator -e ".."xflock4"},
}
Debian_menu["Debian_Screen_Saving"] = {
	{"Activate ScreenSaver (Next)","/usr/bin/xscreensaver-command -next"},
	{"Activate ScreenSaver (Previous)","/usr/bin/xscreensaver-command -prev"},
	{"Activate ScreenSaver (Random)","/usr/bin/xscreensaver-command -activate"},
	{"Demo Screen Hacks","/usr/bin/xscreensaver-command -demo"},
	{"Disable XScreenSaver","/usr/bin/xscreensaver-command -exit"},
	{"Enable XScreenSaver","/usr/bin/xscreensaver"},
	{"Reinitialize XScreenSaver","/usr/bin/xscreensaver-command -restart"},
	{"ScreenSaver Preferences","/usr/bin/xscreensaver-command -prefs"},
}
Debian_menu["Debian_Screen"] = {
	{ "Locking", Debian_menu["Debian_Screen_Locking"] },
	{ "Saving", Debian_menu["Debian_Screen_Saving"] },
}
Debian_menu["Debian"] = {
	{ "Applications", Debian_menu["Debian_Applications"] },
	{ "Games", Debian_menu["Debian_Games"] },
	{ "Help", Debian_menu["Debian_Help"] },
	{ "Screen", Debian_menu["Debian_Screen"] },
}
