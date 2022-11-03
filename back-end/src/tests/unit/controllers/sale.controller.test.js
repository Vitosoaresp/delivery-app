const { expect } = require('chai');
const sinon = require('sinon');

const saleService = require('../../../services/sale.service');
const saleController = require('../../../controllers/sale.controller');
const { salesMocks } = require('../../mocks/sale.mocks');

describe('Testes de unidade do controller de sales', function () {
  describe('teste do endpoint /sales', function () {
    const req = {};
    const res = {};

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('Busca por todos as vendas realizadas com sucesso', async function () {
      sinon.stub(saleService, 'getAll').resolves(salesMocks);
      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(salesMocks)).to.be.true;
    });
  });
});