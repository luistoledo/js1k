#!/usr/bin/env bash

# to install uglify: npm install -g uglifyjs
# to install jcrush: npm install -g jscrush

in="js1k-2016.js"
min="js1k-2016.min.js"
crush="js1k-2016.crush.js"

if [ "$1" == "" ]; then
  echo "param 1 =  ug:uglify || cc:closure-compiler"
  echo "param 2 =  jc:jcrush || rp:regPack"
fi

if [ "$1" == "ug" ]; then
  echo "uglify"
  uglifyjs --compress --mangle  -- $in > $min
fi

if [ "$1" == "cc" ]; then
  echo "closure-compiler"
  java -jar compiler.jar $in --language_in=ECMASCRIPT5 --compilation_level=ADVANCED_OPTIMIZATIONS  --externs=extern1.js > $min
fi

if [ "$2" == "jc" ]; then
  echo "jcrush"
  cat $min | jscrush 1> $crush
fi

if [ "$2" == "rp" ]; then
  echo "regPack"
  node ./regPack.js $min --crushGainFactor 2 --crushLenghtFactor 0 --crushCopiesFactor 0 > $crush
fi

echo "Results:"
wc -c js1k*.js
