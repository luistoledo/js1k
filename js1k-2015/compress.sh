if [ "$1" == "" ]; then
  echo "param 1 =  ug:uglify || cc:closure-compiler"
  echo "param 2 =  jc:jcrush || rp:regPack"
fi

if [ "$1" == "ug" ]; then
  echo "uglify"
  uglifyjs --compress --mangle  -- js1k-2015.js > js1k-2015.min.js
fi

if [ "$1" == "cc" ]; then
  echo "closure-compiler"
  java -jar compiler.jar js1k-2015.js --language_in=ECMASCRIPT5 --compilation_level=ADVANCED_OPTIMIZATIONS  --externs=extern1.js > js1k-2015.min.js
fi

if [ "$2" == "jc" ]; then
  echo "jcrush"
  cat js1k-2015.min.js | jscrush 1> js1k-2015.crush.js
fi

if [ "$2" == "rp" ]; then
  echo "regPack"
  node ./regPack.js js1k-2015.min.js --crushGainFactor 2 --crushLenghtFactor 0 --crushCopiesFactor 0 > js1k-2015.crush.js
fi

echo "Results:"
wc -c js1k*.js