const { expect } = require('chai');
const sinon = require('sinon');

const { Sale } = require('../../../database/models');
const SaleService = require('../../../services/sale.service');
const SaleController = require('../../../controllers/sale.controller');

const saleMock = { 
  userId: 1,
  sellerId: 2,
  totalPrice: 10.0,
  deliveryAddress: 'rua 2',
  delineryNumber: '121',
  saleDate: '03/11/2022 15:47',
}

const saleMockWithId = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: 10.0,
  deliveryAddress: 'rua 2',
  delineryNumber: '121',
  saleDate: '03/11/2022 15:47',
}

describe('Testes de unidade do controller de sales', function () {
  describe('teste do endpoint /sales', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.body = saleMock;
      req.user = { data: { id: 1 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('cadastro realizado com sucesso', async function () {
      sinon.stub(SaleService, 'create').resolves(saleMockWithId);
      await SaleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(saleMockWithId)).to.be.true;
    });
  });

  describe('teste do endpoint /sales/seller/:id', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.params = 2;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('busca realizada com sucesso', async function () {
      sinon.stub(SaleService, 'getBySeller').resolves([saleMockWithId]);
      await SaleController.getBySeller(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([saleMockWithId])).to.be.true;
    });
  });

  afterEach(sinon.restore);
});