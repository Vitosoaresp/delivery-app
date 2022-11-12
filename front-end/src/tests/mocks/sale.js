export const createSaleReturnMock = {
  id: 1,
  userId: 1,
  totalPrice: 2.20,
  deliveryAddress: 'Rua das Flores',
  deliveryNumber: '123',
  saleDate: new Date('2021-07-01T00:00:00.000Z').toLocaleDateString('pt-BR'),
  status: 'Pendente',
};

export const salesMock = [
  {
    id: 1,
    userId: 1,
    totalPrice: 2.20,
    deliveryAddress: 'Rua das Flores',
    deliveryNumber: '123',
    saleDate: new Date('2021-07-01T00:00:00.000Z').toLocaleDateString('pt-BR'),
    status: 'Pendente',
    products: [
      {
        id: 1,
        name: 'Skol Lata 350ml',
        price: 2.20,
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
    ],
  },
];
