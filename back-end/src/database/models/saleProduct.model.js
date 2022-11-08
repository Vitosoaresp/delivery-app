module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      quantity: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    });
  
    SaleProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, {
        as: 'sales',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId'
      });

      models.Product.belongsToMany(models.Sale, {
        as: 'products',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId'
      });
    };
    
    return SaleProduct;
  };