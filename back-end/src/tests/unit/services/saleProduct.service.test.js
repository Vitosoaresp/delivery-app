const { expect } = require('chai');
const sinon = require('sinon');

const { SaleProduct } = require('../../../database/models');
const SaleProductService = require('../../../services/saleProduct.service');

const sale = { 
  userId: 1,
  productId: 3,
  quantity: 7,
}

describe('Testes de unidade do service de SaleProduct', function () {
  describe('teste do endpoint /sales/products', function () {
    it('SaleProduct criado com sucesso', async function () {
      sinon.stub(SaleProduct, 'create').resolves(sale);
      const result = await SaleProductService.create(sale);
  
      expect(result).to.be.deep.equal(sale);
      expect(result).to.be.an('object');
    });
  });

  afterEach(sinon.restore);
});