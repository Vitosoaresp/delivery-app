const sinon = require('sinon');
const { expect } = require('chai');

const saleService = require('../../../services/sale.service');
const { Sale } = require('../../../database/models');
const { salesMocks, saleMock, saleMockWithId } = require('../../mocks/sale.mocks');

describe('Testes de unidade do service de sales', () => {
  beforeEach(() => {
    sinon.stub(Sale, 'findAll').resolves(salesMocks);
    sinon.stub(Sale, 'create').resolves({ id: 1 });
    sinon.stub(Sale, 'findByPk')
      .onFirstCall().resolves(saleMock).onSecondCall().resolves(null);
  })

  afterEach(() => {
    sinon.restore();
  });

  describe('teste do endpoint /sales', () => {
    it('Busca por todos as vendas realizadas com sucesso', async () => {
      const result = await saleService.getAll();
      expect(result).to.be.deep.equal(salesMocks);
    });
  });

  describe('teste do endpoint /sales/:id', () => {
    it('Busca por uma venda com sucesso', async () => {
      const result = await saleService.getById(1);
      expect(result).to.be.deep.equal(saleMockWithId);
    });

    it('caso a venda não exista, retorna uma mensagem de erro', async () => {
      const result = await saleService.getById(99);
      expect(result).to.be.deep.equal({ message: 'Sale not found' });
    });
  });

  describe('teste do endpoint /sales', () => {
    it('Sale criado com sucesso', async () => {
      const result = await SaleService.create(saleMock);
      expect(result).to.be.deep.equal({ id: 1 });
      expect(result).to.be.an('object');
    });
  });
});
