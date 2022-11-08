const { expect } = require('chai');
const sinon = require('sinon');

const saleService = require('../../../services/sale.service');
const saleController = require('../../../controllers/sale.controller');
const { salesMocks, saleMock, saleMockWithId } = require('../../mocks/sale.mocks');

describe('Testes de unidade do controller de sales', () => {
  describe('teste do endpoint GET /sales', () => {
    const req = {};
    const res = {};

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('Busca por todos as vendas realizadas com sucesso', async () => {
      sinon.stub(saleService, 'getAll').resolves(salesMocks);
      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(salesMocks)).to.be.true;
    });
  });

  describe('teste do endpoint POST /sales', () => {
    const req = {};
    const res = {};

    before(async () => {
      req.body = saleMock;
      req.user = saleMockWithId;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('cadastro realizado com sucesso', async () => {
      sinon.stub(saleService, 'create').resolves({ id: 1 });
      await saleController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1 })).to.be.true;
    });
  });
});