const { expect } = require('chai');
const sinon = require('sinon');

const SaleProductService = require('../../../services/saleProduct.service');
const SaleProductController = require('../../../controllers/saleProduct.controller');

const sale = { 
  saleId: 1,
  productId: 3,
  quantity: 7,
}

describe('Testes de unidade do controller de saleProduct', function () {
  describe('teste do endpoint /sales/products', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.body = sale;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('cadastro realizado com sucesso', async function () {
      sinon.stub(SaleProductService, 'create').resolves(sale);
      await SaleProductController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sale)).to.be.true;
    });
  });


  afterEach(sinon.restore);
});