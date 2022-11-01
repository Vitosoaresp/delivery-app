import Navbar from '../Components/Navbar';
import products from './mockProducts';
import CardProduct from '../Components/CardProduct';

export default function Products() {
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
        {/* ESSE EH UM DADO MOCKADO PARA TESTAR OS CARDS, O MESMO DEVE VIR DO BANCO DE DADOS */}
        {products.map((product) => (
          <CardProduct
            key={ product.id }
            id={ product.id }
            cost={ product.price }
            name={ product.name }
            thumb={ product.url_image }
          />
        ))}

      </main>
    </div>
  );
}
