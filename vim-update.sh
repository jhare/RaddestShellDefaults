#!/bin/sh

# Remove old .vim and .vimrc
rm -rf ~/.vim

# Get plugins up to date
git submodule init
git submodule update

# Copy it to the home
cp -Rv .vim* ~
