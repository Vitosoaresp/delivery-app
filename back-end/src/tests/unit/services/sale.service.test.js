const { expect } = require('chai');
const sinon = require('sinon');

const { Sale } = require('../../../database/models');
const SaleService = require('../../../services/sale.service');

const sale = { 
    userId: 1,
    sellerId: 2,
    totalPrice: 10.0,
    deliveryAddress: 'rua 2',
    delineryNumber: '121',
    saleDate: '03/11/2022 15:47',
}

describe('Testes de unidade do service de Sales', function () {
  describe('teste do endpoint /sales', function () {
    it('Sale criado com sucesso', async function () {
      sinon.stub(Sale, 'create').resolves({ id: 1 });
      const result = await SaleService.create(sale);
  
      expect(result).to.be.deep.equal({ id: 1 });
      expect(result).to.be.an('object');
    });
  });

  afterEach(sinon.restore);
});