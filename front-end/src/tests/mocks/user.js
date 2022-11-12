import products from './productsMocks';

const emailMock = 'fulana@deliveryapp.com';
const passwordMock = 'fulana@123';
const emailFailMock = 'test@gmail';
const passwordFailMock = '1234';
const nameMock = 'pessoa teste';
const nameFailMock = 'pess';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const userStorageMock = {
  userId: 3,
  email: emailMock,
  name: 'Fulana da Silva',
  role: 'customer',
  token: fakeToken,
};

const fakeCart = [];

const contextMock = {
  productsInfo: products,
  cart: fakeCart,
  setCart: (product) => fakeCart.push(product),
};

const responseApi = {
  email: emailMock,
  name: nameMock,
  password: 'adhsajdiwadajsgsda',
  id: 6,
  role: 'customer',
};

const allUsers = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
];

const userAlreadyExists = { message: 'User already registered' };

export {
  allUsers,
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
