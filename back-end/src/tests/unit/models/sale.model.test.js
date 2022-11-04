// const {
//   sequelize,
//   dataTypes,
//   checkModelName,
//   checkPropertyExists,
// } = require('sequelize-test-helpers');

// const SaleModel = require('../../../database/models/sale.model');

// describe('Testes de unidade do model de sales', function () {
//   describe('teste do endpoint /sales', function () {
//     const Sale = SaleModel(sequelize, dataTypes);
//     const sale = new Sale();

//     it('model possui o nome "Sale"', function () {
//       checkModelName(sale)('');
//     });

//     it('possui as propriedades "fullName" e "email"', () => {
//       ['userId', 'sellerId', 'email'].forEach(checkPropertyExists(sale));
//     });
//   });
// });
