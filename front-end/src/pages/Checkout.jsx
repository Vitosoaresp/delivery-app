import Navbar from '../Components/Navbar';
// import OrderDetails from '../Components/OrderDetails';

export default function Checkout() {
  return (
    <div>
      <Navbar />
      <container>
        <h1>Finalizar Pedido</h1>
        {/* <OrderDetails /> */}
        <select data-testid="customer_checkoutselect-seller">
          <option value="ss">ss</option>
          <option value="adasd">adasd</option>
          <option value="sdads">sdads</option>
        </select>
        <input type="text" data-testid="customer_checkoutinput-address" />
        <input type="text" data-testid="customer_checkoutinput-address-number" />
        <button type="submit" data-testid="customer_checkoutbutton-submit-order">
          Finalizar Pedido
        </button>
      </container>
    </div>
  );
}
