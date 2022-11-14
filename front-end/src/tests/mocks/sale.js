export const createSaleReturnMock = {
  id: 1,
  userId: 1,
  totalPrice: 2.20,
  deliveryAddress: 'Rua das Flores',
  deliveryNumber: '123',
  saleDate: new Date('2021-07-01T00:00:00.000Z').toLocaleDateString('pt-BR'),
  status: 'Pendente',
};

const date = new Date('2022-11-01T01:00:10.000Z');

export const salesMock = [
  {
    id: 1,
    userId: 3,
    totalPrice: '2.20',
    deliveryAddress: 'Rua das Flores',
    deliveryNumber: '123',
    saleDate: date,
    status: 'Pendente',
    sales: [
      {
        id: 1,
        name: 'Skol Lata 350ml',
        price: 2.20,
        SaleProduct: {
          quantity: 1,
          saleId: 1,
          productId: 1,
        },
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
    ],
    sellers: {
      id: 2,
      name: 'Fulana Pereira',
    },
  },
];

export const mockSalesOrders = [
  {
    deliveryAddress: 'rua pereira',
    deliveryNumber: '12',
    id: 1,
    saleDate: new Date('2022-11-01T01:00:10.000Z').toString(),
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '15.40',
    userId: 3,
  },
];
