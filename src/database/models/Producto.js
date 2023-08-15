module.exports = (Sequelize, DataTypes) => {
    let alias = 'Producto';
    let cols = {
        id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_prod: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        precio_prod: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            allowNull: false
        },
        id_marca: DataTypes.BIGINT(11).UNSIGNED,
        imagen: DataTypes.BLOB("long")
    };
    let config = {       
        timestamps: false
    }

    const Producto = Sequelize.define(alias,cols,config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Marca, {
            as: "marca",
            foreignKey: "id_marca"
        })
    }

    return Producto



}