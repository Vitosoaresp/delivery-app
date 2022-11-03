const { expect } = require('chai');
const sinon = require('sinon');

const { Sale } = require('../../../database/models');
const SaleService = require('../../../services/sale.service');
const SaleController = require('../../../controllers/sale.controller');

saleMock = { 
  userId: 1,
  sellerId: 2,
  totalPrice: 10.0,
  deliveryAddress: 'rua 2',
  delineryNumber: '121',
  saleDate: '03/11/2022 15:47',
}

saleMockWithId = {
  data: {
    id: 1,
  }
}

describe('Testes de unidade do controller de sales', function () {
  describe('teste do endpoint /sales', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.body = saleMock;
      req.user = saleMockWithId;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('cadastro realizado com sucesso', async function () {
      sinon.stub(SaleService, 'create').resolves({ id: 1 });
      await SaleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1 })).to.be.true;
    });
  });


  afterEach(sinon.restore);
});