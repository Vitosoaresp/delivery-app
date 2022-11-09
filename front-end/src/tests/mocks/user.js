const emailMock = 'fulana@deliveryapp.com';
const passwordMock = 'fulana@123';
const emailFailMock = 'test@gmail';
const passwordFailMock = '1234';
const nameMock = 'pessoa teste';
const nameFailMock = 'pess';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const userStorageMock = {
  id: 3,
  email: emailMock,
  name: 'Fulana da Silva',
  role: 'customer',
  token: fakeToken,
};

const contextMock = {
  products: [],
  cart: [],
};

const responseApi = {
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
  responseApi,
  userAlreadyExists,
  userStorageMock,
  fakeToken,
  contextMock,
};
