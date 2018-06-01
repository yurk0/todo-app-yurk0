module.exports = function(sequelize, DataTypes) {
    var ListSchema = sequelize.define("lists", {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        description: DataTypes.TEXT,
        deleted: {type: DataTypes.INTEGER, defaultValue: 0}
    },{
        timestamps: false
    });
    return ListSchema;
}