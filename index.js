var http = require('http');
var soap = require('soap');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser;

var helloService = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function (args) {  //change
                  var xml = require('fs').readFileSync('movieG5.xml', 'utf8')
                  xml = xml.replace(/(\r\n|\n|\r|\t)/gm, "");
                  var doc = new dom().parseFromString(xml)
                  var nodes = xpath.select("/movielist", doc);
                  for (var i = 0; i < nodes[0].getElementsByTagName("movie").length; i++) {
                      if (nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("name")[0].childNodes[0].nodeValue == args.old_movie_name) {
                          nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("name")[0].childNodes[0].data = args.new_movie_name;
                      }
                  }
                  console.log(nodes[0].getElementsByTagName("movie")[0].getElementsByTagName("name")[0].toString());
                  return { xml: nodes.toString() };
            },
            sayHello2: function (args) {  //remove
                var xml = require('fs').readFileSync('movieG5.xml', 'utf8')
                xml = xml.replace(/(\r\n|\n|\r|\t)/gm, "");
                var doc = new dom().parseFromString(xml)
                var nodes = xpath.select("/movielist", doc);
                console.log(nodes[0].getElementsByTagName("movie").length);
             //-------------------------------------------- remove by id ----------------------------------------------------------
                //nodes[0].removeChild(nodes[0].getElementsByTagName("movie")[args.movie_id]);
             //--------------------------------------------------------------------------------------------------------------------
             //-------------------------------------------- remove by movie name --------------------------------------------------
                for (var i = 0; i < nodes[0].getElementsByTagName("movie").length; i++) {       //remove by movie name
                    if (nodes[0].getElementsByTagName("movie")[i].childNodes[0].nodeValue == args.movie_name) { 
                        nodes[0].removeChild(nodes[0].getElementsByTagName("movie")[i]);
                    }
                }
             //--------------------------------------------------------------------------------------------------------------------
                console.log(nodes[0].getElementsByTagName("movie")[0].getElementsByTagName("name")[0].toString());
                return { xml: nodes.toString() };
            },
            sayHello3: function (args) {  //query
                var xml = require('fs').readFileSync('movieG5.xml', 'utf8')
                xml = xml.replace(/(\r\n|\n|\r|\t)/gm, "");
                var doc = new dom().parseFromString(xml)
                var nodes = xpath.select("/movielist", doc);
                console.log(nodes[0].getElementsByTagName("movie").length);
                var i = 0; 
                while (i < nodes[0].getElementsByTagName("movie").length) {       //remove tuples that none of argumnet is equal
                    if (nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("name")[0].childNodes[0].nodeValue == args.movie_name ||
                        nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("director")[0].childNodes[0].nodeValue == args.director) {
                        console.log(nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                        console.log(nodes[0].getElementsByTagName("movie")[i].getElementsByTagName("director")[0].childNodes[0].nodeValue);
                        i++;
                    } else {
                        nodes[0].removeChild(nodes[0].getElementsByTagName("movie")[i]);
                    }
                }
                //console.log(nodes[0].getElementsByTagName("movie")[0].getElementsByTagName("name")[0].toString());
                return { xml: nodes.toString() };
            },
            sayHello4: function (args) {  //add
                var xml = require('fs').readFileSync('movieG5.xml', 'utf8')
                xml = xml.replace(/(\r\n|\n|\r|\t)/gm, "");
                var doc = new dom().parseFromString(xml)
                var nodes = doc[0]//xpath.select("/movielist", doc);
                //console.log(nodes.toString());
                var newMovie = nodes.createElement("movie");
                var moviename = nodes.createElement("name");
                var a = nodes.createTextNode(args.movie_name)
                moviename.appendChild(a);
                var direc = nodes.createElement("director");
                var b = nodes.createTextNode(args.director)
                direc.appendChild(b);
                var year = nodes.createElement("year");
                var c = nodes.createTextNode(args.year)
                year.appendChild(c);
                var gen = nodes.createElement("genres");
                var g = nodes.createElement("genre");
                var d = nodes.createTextNode(args.gerne)
                g.appendChild(d);
                gen.appendChild(g);
                var stars = nodes.createElement("stars");
                var f = nodes.createElement("name");
                var e = nodes.createTextNode(args.star)
                f.appendChild(e);
                stars.appendChild(f);
                newMovie.appendChild(moviename);
                newMovie.appendChild(direc);
                newMovie.appendChild(year);
                newMovie.appendChild(gen);
                newMovie.appendChild(stars);
                console.log(newMovie[0].toString());
                nodes[0].getElementsByTagName("movielist")[0].getElementsByTagName("movie")[0].appendChild(newMovie);
                console.log(nodes.getElementsByTagName("movielist")[0].getElementsByTagName("name")[0].toString());
                return { xml: nodes.toString() };
            }
        }
    }
}
var xml = require('fs').readFileSync('HelloService.wsdl', 'utf8'),
      server = http.createServer(function (request, response) {
          response.end("404: Not Found: " + request.url)
      });

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
  });

soap.listen(server, '/wsdl', helloService, xml);
