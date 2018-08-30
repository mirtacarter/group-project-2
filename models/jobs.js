module.exports = function(sequelize, DataTypes) {
    //Takes the job information from the API
    var Jobs = sequelize.define("Jobs", {
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

    //Associate the job post with the user that saved it
    Jobs.associate = function(models) {
        Jobs.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Jobs;
}