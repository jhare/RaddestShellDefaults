" Joe Hare's default vim profile
execute pathogen#infect()

" Pop out of insert and visual modes easily
imap jj <Esc>
vmap vv <Esc>

"Set the leader key to baus status
let mapleader=","

" Disable compatibility with 
set nocompatible

" Show line numbers
set number

" hide buffers instead of closing and forcing a save
set hidden

set nobackup

" Highlight search results
set hlsearch

" Highlight text as you type in a search
set incsearch

" Disable the arrow keys like a baus.
map <up> <C-W>+
map <down> <C-W>-
map <left> <C-W><
map <right> <C-W>>

" set up a longer history
set history=1000
set undolevels=1000
set title
set visualbell
set noerrorbells

" Always display file name
set modeline
set ls=2

" Turn off line wrapping
set nowrap

" Enable syntax
syntax on 
filetype plugin indent on

" Default spacings
set ai
set ts=2
set sts=2
set et
set sw=2
set textwidth=80
set colorcolumn=80

set fillchars=stl:-,stlnc:-,vert:│

" Map NERDTree to Ctrl+n
map <C-n> :NERDTreeToggle<CR>
map <C-m> :NERDTreeMirror<CR>

" Quick access to buffer search
:map <leader>, :buffer<Space>

:nnoremap s :exec "normal i".nr2char(getchar())."\e"<CR>
:nnoremap S :exec "normal a".nr2char(getchar())."\e"<CR>

"selection shortcuts
:map <leader>a 1GvGG$ " select whole file in visual mode
:map <leader>f 1GvGG$= " select whole file in visual, correct whitespace

" Set color scheme
colorscheme lucius
LuciusBlackHighContrast
:map <leader>b :hi Normal ctermbg=None<CR>
:map <leader>bb :LuciusBlackHighContrast<CR>
