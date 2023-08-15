module.exports = (Sequelize, DataTypes) => {
    let alias = 'Marca';
    let cols = {
        id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_marca: {
            type: DataTypes.STRING(100),
            allowNull: false
        }        
    };

    let config = {       
        timestamps: false
    }

    const Marca = Sequelize.define(alias,cols,config);

    Marca.associate = function(models) {
        Marca.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_marca"
        })
    }

    return Marca

}