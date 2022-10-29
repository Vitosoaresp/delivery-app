module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    price: {
      tipe: DataTypes.DECIMAL(4,2)
    },
    urlImage: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignKey: 'product_id', as: 'salesProducts' });
  };

  return Product;
};