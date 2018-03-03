#!/usr/bin/env bash

# to install uglify: npm install -g uglify-es
# to install jcrush: npm install -g jscrush
# to install jcrush: npm install -g regpack
# to install jcrush: npm install -g babel-minify

in="js1k-2016.js"
min="js1k-2016.min.js"
crush="js1k-2016.crush.js"

if [ "$1" == "" ]; then
  echo "sh compress.sh (param1) (param2)"
  echo "param 1 =  ug:uglify || bm:babel minify"
  echo "param 2 =  jc:jcrush || rp:regPack"
fi

# uglify looks broken on ES6 ; so use uglify-es
if [ "$1" == "ug" ]; then
  echo "uglify"
  uglifyjs --compress --mangle  -- $in > $min
fi

# babel minify
if [ "$1" == "bm" ]; then
  echo "minify"
  minify $in -o $min
fi

if [ "$2" == "jc" ]; then
  echo "jcrush"
  cat $min | jscrush 1> $crush
fi

if [ "$2" == "rp" ]; then
  echo "regPack"
  regpack $min --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0  --contextVariableName "c" --hash2DContext true --hashAudioContext true --hashWebGLContext true --varsNotReassigned "a b c d g" > $crush
fi

echo "Results:"
wc -c js1k*.js
