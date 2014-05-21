#!/bin/sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git mercurial build-essential awesome awesome-extras
sudo apt-get install openssh-server vim-gtk conky htop tig 
sudo apt-get install terminator nmap wget curl pidgin irssi
sudo apt-get install libncurses5 libncurses5-dev liblua5.1-dev python2.7-dev

# Install NeoBundle for vim
curl https://raw.githubusercontent.com/Shougo/neobundle.vim/master/bin/install.sh | sh
