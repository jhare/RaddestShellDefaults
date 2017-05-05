" Set up NeoBundle as well
" source ~/.vim/vimrcs/neobundle-setup.vim
"NeoBundle Scripts-----------------------------
if has('vim_starting')
  set nocompatible               " Be iMproved

  " Required:
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" Required:
call neobundle#begin(expand('~/.vim/bundle'))

" Let NeoBundle manage NeoBundle
" Required:
NeoBundleFetch 'Shougo/neobundle.vim'

NeoBundle 'Shougo/vimproc', {
      \ 'build' : {
      \     'windows' : 'make -f make_mingw32.mak',
      \     'cygwin' : 'make -f make_cygwin.mak',
      \     'mac' : 'make -f make_mac.mak',
      \     'unix' : 'make -f make_unix.mak',
      \    },
      \ }
NeoBundle 'Shougo/vimshell'

" My Bundles here:
NeoBundle 'tpope/vim-fugitive'
NeoBundle 'tpope/vim-sensible'
NeoBundle 'jonathanfilip/vim-lucius'
NeoBundle 'scrooloose/nerdtree'
NeoBundle 'scrooloose/syntastic'
NeoBundle 'scrooloose/nerdcommenter'
NeoBundle 'elzr/vim-json'
NeoBundle 'wavded/vim-stylus'
NeoBundle 'kchmck/vim-coffee-script'

" Required:
call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck
"End NeoBundle Scripts-------------------------

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


" Enable syntax
syntax on 

" Wrapping on insert (actually changing the file)
set textwidth=80

" Show that ugly gutter at char 80 so we know where we're at
" TODO: Can we show 74 in a lighter diff color, like a thinner line too?
" Something in UTF that doesn't suck?
set colorcolumn=80

set cindent

" TODO: Need to set this based on filetype
set expandtab shiftwidth=2 tabstop=2

set splitright
set splitbelow

set fillchars=stl:-,stlnc:-,vert:│

" Map NERDTree to Ctrl+n
map <leader>n :NERDTreeToggle<CR>
map <leader>m :NERDTreeMirror<CR>

:map <leader>a 1GvGG$ " select whole file in visual mode

colorscheme lucius
LuciusBlackHighContrast

" Syntastic settings
" let g:syntastic_json_checkers = ['jsonlint']
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0

" NERDCommenter change
noremap <leader>c :NERDComToggleComment<cr>
