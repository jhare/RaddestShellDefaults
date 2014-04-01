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

" Wrapping and display lines
set textwidth=80
set colorcolumn=80

set cindent

" Insert tab characters represetned
"set noexpandtab shiftwidth=4 tabstop=4

" Insert 4 spaces when tab is pressed.
set expandtab shiftwidth=4 tabstop=4

set fillchars=stl:-,stlnc:-,vert:│

" Map NERDTree to Ctrl+n
map <C-n> :NERDTreeToggle<CR>
map <C-m> :NERDTreeMirror<CR>

" Set up folding
augroup vimrc
  au BufReadPre * setlocal foldmethod=indent
  au BufWinEnter * if &fdm == 'indent' | setlocal foldmethod=manual | endif
augroup END

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

" Syntastic settings
let g:syntastic_json_checkers = ['jsonlint']

" Find .jshintrc for Syntastic
function s:find_jshintrc(dir)
    let l:found = globpath(a:dir, '.jshintrc')
    if filereadable(l:found)
        return l:found
    endif

    let l:parent = fnamemodify(a:dir, ':h')
    if l:parent != a:dir
        return s:find_jshintrc(l:parent)
    endif

    return "~/.jshintrc"
endfunction

function UpdateJsHintConf()
    let l:dir = expand('%:p:h')
    let l:jshintrc = s:find_jshintrc(l:dir)
    let g:syntastic_javascript_jshint_conf = l:jshintrc
endfunction

au BufEnter * call UpdateJsHintConf()
