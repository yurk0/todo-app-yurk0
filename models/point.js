module.exports = function(sequelize, DataTypes) {
    var PointSchema = sequelize.define("points", {
        point_id: { type: DataTypes.INTEGER, primaryKey: true },
        list_id: { type: DataTypes.INTEGER,references:{model:"lists", key:"id"}},
        description: DataTypes.TEXT,
        deleted: {type: DataTypes.INTEGER,defaultValue: 0},
        result: {type: DataTypes.INTEGER,defaultValue: 0}
    },{
        timestamps: false
    });
    return PointSchema;
}