import React from 'react';
import SellerNavbar from '../Components/SellerNavbar';

export default function Checkout() {
  // const [sales, setSales] = useState([]);

  // useEffect(() => {
  //   const fetchSales = async () => {
  //     const { id } = JSON.parse(localStorage.getItem('user'));
  //     const { data } = await getSalesBySeller(id);
  //     setSales(data);
  //   };

  //   fetchSales();
  // }, [sales]);

  // const renderSaleBox = () => {
  //   const salesBox = sales.map((sale) => {
  //     const { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = sale;
  //     return (<SaleBox
  //       key={ id }
  //       id={ id }
  //       totalPrice={ totalPrice }
  //       deliveryAddress={ deliveryAddress }
  //       deliveryNumber={ deliveryNumber }
  //       saleDate={ moment(saleDate).format('L') }
  //       status={ status }
  //     />);
  //   });
  //   return salesBox;
  // };

  return (
    <div>
      <SellerNavbar title="GERENCIAR USUÁRIOS" />
    </div>
  );
}
