const emailMock = 'fulana@deliveryapp.com';
const passwordMock = 'fulana@123';
const emailFailMock = 'test@gmail';
const passwordFailMock = '1234';

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

export {
  emailMock,
  passwordMock,
  emailFailMock,
  passwordFailMock,
  userStorageMock,
  fakeToken,
  contextMock,
};
