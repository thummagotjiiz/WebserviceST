var soap = require('soap');
var url = 'http://together-webservice.herokuapp.com:3000/wsdl?wsdl';
var args1 = { old_movie_name: "The Dark Knight", new_movie_name: "The Dark Knight2" };
var args2 = { movie_name: "The Dark Knight" };
var args3 = { movie_name: "Immortals", director: "Christopher Nolan" };
var args4 = { movie_name: "MOVIENAME", director: "DIRECTOR", year: "2016", gerne: "GERNE", star: "STAR" };

  soap.createClient(url, function (err, client) {
      client.sayHello(args1, function (err, result) { //change
          console.log(result.xml);
      });
      client.sayHello2(args2, function(err, result) { //remove
          console.log(result.xml);
      });
      client.sayHello3(args3, function (err, result) { //query
          console.log(result.xml);
      });
      //client.sayHello4(args4, function (err, result) { //add
      //   console.log(result.xml);
      //});
  });
