var db = require("../models");

module.exports = function(app) {
  // Get all saved jobs for the user
  app.get("/api/jobs", function(req, res) {
    db.Jobs.findAll({
        where: {
            userId: req.params.userId
        }
    }).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Add a job to the saved list
  app.post("/api/jobs", function(req, res) {
    db.Jobs.create(req.body).then(function(dbJobs) {
      res.json(dbJobs);
    });
  });

  // Delete a saved job
  app.delete("/api/jobs/:id", function(req, res) {
    db.Jobs.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
