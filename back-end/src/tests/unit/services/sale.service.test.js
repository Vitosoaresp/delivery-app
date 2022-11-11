const { expect } = require('chai');
const sinon = require('sinon');

const { Sale } = require('../../../database/models');
const SaleService = require('../../../services/sale.service');
const saleProductService = require('../../../services/saleProduct.service');

const cart = [
  { id: 1, name: 'Skol Lata 250ml', quantity: 10 },
];

const sale = { 
  userId: 1,
  sellerId: 2,
  totalPrice: 10.0,
  deliveryAddress: 'rua 2',
  delineryNumber: '121',
  saleDate: '03/11/2022 15:47',
  cart,
}

const saleWithId = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: 10.0,
  deliveryAddress: 'rua 2',
  delineryNumber: '121',
  saleDate: '03/11/2022 15:47',
}

const saleProduct = {
  saleId: 1,
  productId: 1,
  quantity: 10,
}

describe('Testes de unidade do service de Sales', function () {
  // Method create
  describe('teste do endpoint /sales', function () {
    it('Sale criado com sucesso', async function () {
      sinon.stub(Sale, 'create').resolves(saleWithId);
      sinon.stub(saleProductService, 'create').resolves(saleProduct);
      
      const result = await SaleService.create(sale);

      expect(result).to.be.deep.equal(saleWithId);
    });
  });

  // Method getAll
  describe('teste do endpoint /sales', function () {
    it('buscando todos os sales com sucesso', async function () {
      sinon.stub(Sale, 'findAll').resolves(sale);
      const result = await SaleService.getAll();
      expect(result).to.be.deep.equal(sale);
    });
  });

  // Method getBySeller
  describe('teste do endpoint /sales/seller/id', function () {
    it('Busca de Sales por sellerId feito com sucesso', async function () {
      sinon.stub(Sale, 'findAll').resolves([sale]);
      const result = await SaleService.getBySeller([sale]);
  
      expect(result).to.be.deep.equal([sale]);
      expect(result).to.be.an('array');
    });
  });

  // Method getSaleById
  describe('teste do endpoint /sales/:id', function () {
    it('Busca de Sales por sellerId feito com sucesso', async function () {
      sinon.stub(Sale, 'findOne').resolves(saleWithId);
      const result = await SaleService.getSaleById(1);
  
      expect(result).to.be.deep.equal(saleWithId);
      expect(result).to.be.an('object');
    });
  });

  // Method getById
  describe('teste do endpoint /sales/:id', function () {
    it('Busca de Sales por sellerId feito com sucesso', async function () {
      sinon.stub(Sale, 'findByPk').resolves(saleWithId);
      const result = await SaleService.getById(1);
  
      expect(result).to.be.deep.equal(saleWithId);
      expect(result).to.be.an('object');
    });
  });

  // Method getAllByUserId
  describe('teste do endpoint /sales', function () {
    it('Busca de Sales pelo id do user feito com sucesso', async function () {
      sinon.stub(Sale, 'findAll').resolves([saleWithId]);
      const result = await SaleService.getAllByUserId(1);
  
      expect(result).to.be.deep.equal([saleWithId]);
      expect(result).to.be.an('array');
    });
  });

  afterEach(sinon.restore);
});