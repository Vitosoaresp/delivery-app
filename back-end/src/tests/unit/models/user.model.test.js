const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../../database/models');

describe('Testes de unidade do model de users', function () {
  describe('teste do endpoint /login', async function () {
    it('login realizado com sucesso', async function () {
      sinon.stub(User, 'findOne').resolves({});

      const email = "teste@teste.com";
      const password = "aaaaaa"
      const result = await User.findOne({ where: { email, password } });
  
      expect(result).to.be.deep.equal({});
    });
  });

  afterEach(sinon.restore);
});