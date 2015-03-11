if [ "$1" == "1" ]; then
  echo "param 1: uglify + jscrush"
  echo "param 2: closure-compiler + regPack"
fi

if [ "$1" == "1" ]; then
  uglifyjs --compress --mangle  -- js1k-2015.js > js1k-2015.min.js
  cat js1k-2015.min.js | jscrush 1> js1k-2015.crush.js
  wc -c *.js
fi

if [ "$1" == "2" ]; then
  ccjs js1k-2015.js > js1k-2015.min.js
  node ./regPack.js js1k-2015.min.js --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0 > js1k-2015.crush.js
  wc -c *.js
fi