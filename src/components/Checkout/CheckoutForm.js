import React, { useContext } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import styles from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";
import cartContext from "../../store/cart-context";
import useRequest from "../../hooks/use-request";

const validateNameInput = (inputValue) => {
  return inputValue !== "";
};
const validateEmailInput = (inputValue) => {
  return inputValue.includes("@");
};

const CheckoutForm = (props) => {
  const {
    inputValue: nameInputValue,
    inputIsInvalid: nameInputIsInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler
  } = useInput(validateNameInput);

  const {
    inputValue: emailInputValue,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler
  } = useInput(validateEmailInput);

  const { isLoading, error, sendRequest } = useRequest();

  const cartCtx = useContext(cartContext);

  const formIsValid =
    validateNameInput(nameInputValue) && validateEmailInput(emailInputValue);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return alert("Please complete all required fields");
    }
    const payLoad = {
      name: nameInputValue,
      email: emailInputValue,
      date: new Date().getTime(),
      items: cartCtx.items,
      amount: cartCtx.totalAmount
    };
    const requestConfig = {
      url:
        "https://food-order-app-ac388-default-rtdb.firebaseio.com/food-order/foodOrders.json",
      method: "POST",
      body: payLoad
    };

    sendRequest(requestConfig, null);

    if (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <form className={styles["checkout-form"]}>
        <div>
          <Input
            label="Name"
            input={{
              id: "name-input",
              name: "name",
              value: nameInputValue,
              onChange: nameInputChangeHandler,
              onBlur: nameInputBlurHandler,
              style: { width: "300px" }
            }}
            isInvalid={nameInputIsInvalid}
          />
          {nameInputIsInvalid && (
            <p className={styles["error-message"]}>Please enter a valid name</p>
          )}
        </div>
        <div>
          <Input
            label="Email"
            input={{
              id: "email-input",
              name: "email",
              value: emailInputValue,
              onChange: emailInputChangeHandler,
              onBlur: emailInputBlurHandler,
              style: { width: "300px" }
            }}
            isInvalid={emailInputIsInvalid}
          />
          {emailInputIsInvalid && (
            <p className={styles["error-message"]}>
              {" "}
              Please enter a valid email
            </p>
          )}
        </div>
        <div>
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Cancel
          </button>
          <button
            disabled={!formIsValid || isLoading}
            className={styles["button"]}
            onClick={formSubmitHandler}
          >
            Checkout
          </button>
        </div>
      </form>
      {error && (
        <p className={styles["error-message"]}>Error occurred: {error}</p>
      )}
    </Modal>
  );
};

export default CheckoutForm;
