import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import CheckoutForm from "./components/Checkout/CheckoutForm";
import useModal from "./hooks/use-modal";

function App() {
  const {
    modalIsShown: cartIsShown,
    showModalHandler: showCartHandler,
    hideModalHandler: hideCartHandler
  } = useModal();

  const {
    modalIsShown: checkoutFormIsShown,
    showModalHandler: showCheckoutFormHandler,
    hideModalHandler: hideCheckoutFormHandler
  } = useModal();

  const onOrderHandler = () => {
    hideCartHandler();
    showCheckoutFormHandler();
  };

  const onCancelCheckoutHandler = () => {
    hideCheckoutFormHandler();
    showCartHandler();
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onOrder={onOrderHandler} />
      )}
      {checkoutFormIsShown && (
        <CheckoutForm onClose={onCancelCheckoutHandler} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
