module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
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
      SaleProduct.belongsTo(models.Sale,
        { foreignKey: 'sale_id', as: 'sales' });
      SaleProduct.belongsTo(models.Product,
        { foreignKey: 'product_id', as: 'products' });
    };
    
    return SaleProduct;
  };