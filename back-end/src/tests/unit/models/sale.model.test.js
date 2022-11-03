const sinon = require('sinon');
const { expect } = require('chai');

const { Sale } = require('../../../database/models');
const { salesMocks, saleMock } = require('../../mocks/sale.mocks');

describe('Testes de unidade do model de sales', function () {
  beforeEach(() => {
    sinon.stub(Sale, 'findAll').resolves(salesMocks);
    sinon.stub(Sale, 'findByPk').resolves(saleMock);
  })

  afterEach(() => {
    sinon.restore();
  });

  describe('teste do endpoint /sales', function () {
    it('Busca por todos as vendas realizadas com sucesso', async function () {
      const result = await Sale.findAll();

      expect(result).to.be.deep.equal(salesMocks);
    });
  });

  describe('teste do endpoint /sales/:id', function () {
    it('Busca por uma venda com sucesso', async function () {
      const result = await Sale.findByPk(1);

      expect(result).to.be.deep.equal(saleMock);
    });
  });
});