var db = require("../models");

//module.exports = function(app) {
  // Get all examples
 // app.get("/api/examples", function(req, res) {
   // db.Example.findAll({}).then(function(dbExamples) {
//      res.json(dbExamples);
//    });
//  });

  // Create a new example
//  app.post("/api/examples", function(req, res) {
//    db.Example.create(req.body).then(function(dbExample) {
//      res.json(dbExample);
//    });
//  });

  // Delete an example by id
  //app.delete("/api/examples/:id", function(req, res) {
    //db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      //res.json(dbExample);
    //});
 // });
//};



  // POST route for saving a new post
  // req.body is determined by api 
  app.post("/api/jobs", function(req, res) {
    console.log(req.body);
    db.Jobs.create({
      companyName: req.body.companyName,
      location: req.body.location,
      jobTitle: req.body.jobTitle,
      link:req.body.link
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });