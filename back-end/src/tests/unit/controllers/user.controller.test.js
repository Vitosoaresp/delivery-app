const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../database/models');
const UserService = require('../../../services/user.service');
const userController = require('../../../controllers/user.controller');

userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04', // --adm2@21!!--
  role: 'customer',
}

userMockWithToken = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'customer',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0sImlhdCI6MTY2NzUyMjI1MX0.f1wvneXNBAyf5VC6djyzFthpCUL0lAkGyziP2MolSVo'
}

describe('Testes de unidade do controller de users', function () {
  describe('teste do endpoint /login', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.body = { email: userMock.email, password: userMock.password };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('login realizado com sucesso', async function () {
      sinon.stub(UserService, 'login').resolves(userMockWithToken);
      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(userMockWithToken)).to.be.true;
    });

    it('login não realizado com sucesso - Dados invalidos ou Inexistentes', async function () {
      sinon.stub(UserService, 'login').resolves({ message: 'Not Found', status: 404 });
      await userController.login(req, res);
      
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Not Found' })).to.be.true;
    });
  });

  describe('teste do endpoint /register', function () {
    const req = {};
    const res = {};

    before(async () => {
      req.body = { email: userMock.email, password: userMock.password };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    it('cadastro realizado com sucesso', async function () {
      sinon.stub(UserService, 'create').resolves(userMock);
      await userController.create(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(userMock)).to.be.true;
    });

    it('cadastro não realizado com sucesso - name já cadastrado', async function () {
      sinon.stub(UserService, 'create').resolves({ message: 'User already registered', status: 409 });
      await userController.create(req, res);
      
      expect(res.status.calledWith(409)).to.be.true;
      expect(res.json.calledWith({ message: 'User already registered' })).to.be.true;
    });

    it('cadastro não realizado com sucesso - email já cadastrado', async function () {
      sinon.stub(UserService, 'create').resolves({ message: 'User already registered', status: 409 });
      await userController.create(req, res);
      
      expect(res.status.calledWith(409)).to.be.true;
      expect(res.json.calledWith({ message: 'User already registered' })).to.be.true;
    });
  });

  afterEach(sinon.restore);
});