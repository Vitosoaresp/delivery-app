import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CardProduct from '../Components/CardProduct';
import Navbar from '../Components/Navbar';
import { DeliveryContext } from '../context/DeliveryContext';

export default function Products() {
  const history = useHistory();
  const { productsInfo, cart } = useContext(DeliveryContext);

  const totalPrice = cart.reduce((acc, { cost, quantity }) => {
    const price = cost.replace(',', '.');
    return acc + (Number(price) * quantity);
  }, 0);

  return (
    <div>
      <Navbar />
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ cart.length === 0 }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {`Ver Carrinho R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
      <main>
        {productsInfo !== undefined && productsInfo.map((product) => (
          <CardProduct
            key={ product.id }
            id={ product.id }
            cost={ product.price }
            name={ product.name }
            thumb={ product.urlImage }
          />
        ))}

      </main>
    </div>
  );
}
