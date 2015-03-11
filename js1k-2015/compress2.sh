if [ "$2" != "" ]; then
  echo "Missing input file"
  exit 0
fi

if [ "$1" == "ugly-crush" ]; then
  uglifyjs --compress --mangle  -- $2 > ${2%.*}.min.js
  cat js1k-2015.min.js | jscrush 1> js1k-2015.minmin.js
fi

if [ "$1" == "cc-reg" ]; then
  bash java --jar compiler.jar --js_output_file=js1k-2015.min.js js1k-2015.js
  node ./regPack.js js1k-2015.min.js --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0 > js1k-2015.crush.js
fi

# uglifyjs --compress --mangle  -- js1k-2015.js > js1k-2015.min.js
#bash java --jar compiler.jar --js_output_file=js1k-2015.min.js js1k-2015.js
#node ./regPack.js js1k-2015.min.js --crushGainFactor 1 --crushLenghtFactor 0 --crushCopiesFactor 0 > js1k-2015.crush.js
#wc -c *.js