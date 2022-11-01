import { useContext } from 'react';
import CardProduct from '../Components/CardProduct';
import Navbar from '../Components/Navbar';
import { DeliveryContext } from '../context/DeliveryContext';

export default function Products() {
  const { productsInfo } = useContext(DeliveryContext);

  return (
    <div>
      <Navbar />
      <button
        type="button"
        data-testid="customer_products__button-cart"
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho R$
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
