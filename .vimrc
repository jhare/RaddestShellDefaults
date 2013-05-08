" Joe Hare's default vim profile

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

set filetype=on
filetype plugin on
filetype indent on

" Enable syntax and use wombat for it by default
syntax enable 
colo wombat

" Default spacings
set ai
set ts=2
set sts=2
set et
set sw=2
set textwidth=80
set colorcolumn=80

set fillchars=stl:-,stlnc:-,vert:│

hi VertSplit guifg=white guibg=black
hi VertSplit ctermfg=black ctermbg=white

" Have a more subtle column highlighting
hi ColorColumn ctermbg=lightred guibg=lightred

" Filetype specific overrides
" HTML (tab width 2 chr, no wrapping)
autocmd FileType html set sw=2
autocmd FileType html set ts=2
autocmd FileType html set sts=2
autocmd FileType html set textwidth=0
" Python (tab width 4 chr, wrap at 79th char)
autocmd FileType python set sw=4
autocmd FileType python set ts=4
autocmd FileType python set sts=4
autocmd FileType python set textwidth=79
autocmd FileType python set colorcolumn=80
" CSS (tab width 2 chr, wrap at 79th char)
autocmd FileType css set sw=2
autocmd FileType css set ts=2
autocmd FileType css set sts=2
autocmd FileType css set textwidth=79
autocmd FileType css set colorcolumn=80
" JavaScript (tab width 4 chr, wrap at 79th)
autocmd FileType javascript set sw=2
autocmd FileType javascript set ts=2
autocmd FileType javascript set sts=2
autocmd FileType javascript set textwidth=79
autocmd FileType javascript set colorcolumn=80
autocmd FileType javascript colo vividchalk

" PHP settings, getting brave here
autocmd FileType php set sw=4
autocmd FileType php set ts=4
autocmd FileType php set sts=4
autocmd FileType php set textwidth=79
autocmd FileType php set colorcolumn=80


autocmd FileType sql set sw=2
autocmd FileType sql set ts=2
autocmd FileType sql set sts=2
autocmd FileType sql set textwidth=79

" Fire NERDTree automatically
" autocmd vimenter * NERDTree

" Map NERDTree to Ctrl+n
map <C-n> :NERDTreeToggle<CR>


:nnoremap s :exec "normal i".nr2char(getchar())."\e"<CR>
:nnoremap S :exec "normal a".nr2char(getchar())."\e"<CR>

" xdebug settings
:map <Leader>b :Bp<cr> " Map ,b to toggle breakpoint
