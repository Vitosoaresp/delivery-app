const nameMock = 'pessoa teste';
const emailMock = 'test@gmail.com';
const passwordMock = '123456';
const nameFailMock = 'pess';
const emailFailMock = 'test@gmail';
const passwordFailMock = '1234';

const data = {
  email: emailMock,
  name: nameMock,
  password: 'adhsajdiwadajsgsda',
  id: 6,
  role: 'customer',
};

const userAlreadyExists = { message: 'User already registered' };

export {
  nameMock,
  emailMock,
  passwordMock,
  nameFailMock,
  emailFailMock,
  passwordFailMock,
  data,
  userAlreadyExists,
};
