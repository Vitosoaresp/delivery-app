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
      { foreignKey: 'saleId', as: 'sales' });
    SaleProduct.belongsTo(models.Product,
      { foreignKey: 'productId', as: 'products' });
  };

  return SaleProduct;
};