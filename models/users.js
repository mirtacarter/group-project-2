module.exports = function(sequelize, DataTypes) {
    //Information about the user
    var Users = sequelize.define("Jobs", {
        userName: {
            type: DataTypes.STRING
        }
    });

    //Associate the user's id with the jobs they save
    Users.associate = function(models) {
        Users.hasMany(models.Jobs, {
            onDelete: "cascade"
          });
    };
    
    return Users;
};