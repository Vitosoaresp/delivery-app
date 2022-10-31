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
      sinon.stub(UserService, 'login').resolves(userMock);
      await userController.login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ hasToken: false })).to.be.true;
    });

    it('login não realizado com sucesso - Dados invalidos ou Inexistentes', async function () {
      sinon.stub(UserService, 'login').resolves({ message: 'Not Found', status: 404 });
      await userController.login(req, res);
      
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Not Found' })).to.be.true;
    });
  });

  // describe('teste do endpoint /register', function () {
  //   it('cadastro realizado com sucesso', async function () {
  //     sinon.stub(User, 'findOne').resolves(null);
  //     sinon.stub(User, 'create').resolves(userMock);
  //     const result = await UserService.create({
  //       name: userMock.name,
  //       email: userMock.email,
  //       password: '--adm2@21!!--',
  //     });
  //     expect(result).to.be.deep.equal(userMock);
  //   });
  // });


  afterEach(sinon.restore);
});