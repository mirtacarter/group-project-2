module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Jobs", {
        companyName: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        jobTitle: {
            type: DataTypes.STRING
        },
        link: {
            type: DataTypes.STRING
        }
    })

    return Users;
}