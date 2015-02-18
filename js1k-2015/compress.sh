uglifyjs --compress --mangle sort -- js1k-2015.js > js1k-2015.min.js; cat js1k-2015.min.js | jscrush 1> js1k-2015.crush.js; wc -c *.js
