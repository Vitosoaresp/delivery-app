const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../database/models');
const UserService = require('../../../services/user.service');

userMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
}

describe('Testes de unidade do service de users', function () {
  describe('teste do endpoint /login', function () {
    it('login realizado com sucesso', async function () {
      sinon.stub(User, 'findOne').resolves(userMock);

      const email = userMock.email;
      const password = userMock.password;
      const result = await UserService.login({ email, password });
  
      expect(result).to.be.deep.equal(userMock);
    });
  });

  // describe('teste do endpoint /register', function () {
  //   it('cadastro realizado com sucesso', async function () {
  //     sinon.stub(UserService, 'create').resolves(userMock);

  //     const email = userMock.email;
  //     const password = userMock.password;
  //     const result = await UserService.create(email, password);
  
  //     expect(result).to.be.deep.equal(userMock);
  //   });
  // });


  afterEach(sinon.restore);
});