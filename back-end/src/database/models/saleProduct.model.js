module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: 'salesProducts',
      underscored: true,
    });
  
    SaleProduct.associate = (models) => {
      console.log(models);
      models.Sale.belongsToMany(models.Product,
        { as: 'sales', through: SaleProduct, foreignKey: 'saleId', otherKey: 'productId' });
      models.Product.belongsToMany(models.Sale,
        { as: 'products', through: SaleProduct, foreignKey: 'productId', otherKey: 'saleId' });
    };
    
    return SaleProduct;
  };