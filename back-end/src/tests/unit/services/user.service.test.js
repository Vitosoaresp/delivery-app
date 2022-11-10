const { expect } = require('chai');
const sinon = require('sinon');

const jwt= require('jsonwebtoken');

const { User } = require('../../../database/models');
const UserService = require('../../../services/user.service');

const userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04', // --adm2@21!!--
  role: 'customer',
}

const userMockWithToken = {
  userId: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTY2NzUyMjI1MX0.f1wvneXNBAyf5VC6djyzFthpCUL0lAkGyziP2MolSVo'
}

const sellerMock = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  }
]

describe('Testes de unidade do service de users', function () {
  describe('teste do endpoint /login', function () {
    it('login realizado com sucesso', async function () {
      sinon.stub(jwt, 'sign').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTY2NzUyMjI1MX0.f1wvneXNBAyf5VC6djyzFthpCUL0lAkGyziP2MolSVo');
      sinon.stub(User, 'findOne').resolves(userMock);

      const email = userMock.email;
      const password = userMock.password;
      const result = await UserService.login({ email, password });
      expect(result).to.be.deep.equal(userMockWithToken);
    });

    it('login não realizado com sucesso - user não encontrado', async function () {
      sinon.stub(User, 'findOne').resolves(null);

      const email = userMock.email;
      const password = userMock.password;
      const result = await UserService.login({ email, password });
  
      expect(result).to.be.deep.equal({
        message: 'Not Found',
        status: 404,
      });
    });
  });

  describe('teste do endpoint /register', function () {
    it('cadastro realizado com sucesso', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(userMock);
      const result = await UserService.create({
        name: userMock.name,
        email: userMock.email,
        password: '--adm2@21!!--',
      });
      expect(result).to.be.deep.equal(userMock);
    });

    it('cadastro não realizdo realizado com sucesso - Name já cadastrado', async function () {
      sinon.stub(User, 'findOne').resolves(userMock);
      sinon.stub(User, 'create').resolves(null);

      const result = await UserService.create({
        name: userMock.name,
        email: userMock.email,
        password: '--adm2@21!!--',
      });

      expect(result).to.be.deep.equal({
        message: 'User already registered',
        status: 409,
      });
    });

    it('cadastro não realizdo realizado com sucesso - Email já cadastrado', async function () {
      sinon.stub(User, 'findOne').resolves(userMock);
      sinon.stub(User, 'create').resolves(null);

      const result = await UserService.create({
        name: userMock.name,
        email: userMock.email,
        password: '--adm2@21!!--',
      });

      expect(result).to.be.deep.equal({
        message: 'User already registered',
        status: 409,
      });
    });
  });

  describe('teste do endpoint /users/sellers', function () {
    it('buscando todos os sellers com sucesso', async function () {
      sinon.stub(User, 'findAll').resolves(sellerMock);
      const result = await UserService.getSellers();
      expect(result).to.be.deep.equal(sellerMock);
    });
  });

  describe('teste do endpoint /users', function () {
    it('buscando todos os users com sucesso', async function () {
      sinon.stub(User, 'findAll').resolves(userMock);
      const result = await UserService.getAll();
      expect(result).to.be.deep.equal(userMock);
    });
  });

  describe('teste da função getIdByEmail', function () {
    it('buscando o id do usuário pelo email', async function () {
      const email = userMock.email;
      sinon.stub(User, 'findOne').resolves(userMock);
      const result = await UserService.getIdByEmail(email);
      expect(result).to.be.deep.equal(userMock.id);
    });
  });

  afterEach(sinon.restore);
});