const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../database/models');
const UserService = require('../../../services/user.service');

userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04', // --adm2@21!!--
  role: 'customer',
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
      sinon.stub(User, 'findOne').resolves(userMock);

      const email = userMock.email;
      const password = userMock.password;
      const result = await UserService.login({ email, password });
  
      expect(result).to.be.deep.equal(userMock);
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


  afterEach(sinon.restore);
});