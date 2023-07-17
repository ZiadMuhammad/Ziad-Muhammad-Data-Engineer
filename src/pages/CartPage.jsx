import React, { Component } from 'react';
import CartContainer from '../components/CartContainer';
import { CartTitle } from '../components/shared/CartTitle.styled';
import { CartConsumer } from '../context/CartContext';
import { CurrencyConsumer } from '../context/CurrencyContext';

export default class CartPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCheckout = (ogProducts) => {
    window.dataLayer = window.dataLayer || [];

    const products = ogProducts.map((item) => ({
      name: item.val.product.productId,
      id: item.val.product.productId,
      price: item.val.product.price[0].amount.toString(),
      quantity: item.val.qty,
    }));

    window.dataLayer.push({
      event: 'checkout',
      ecommerce: {
        checkout: {
          actionField: { step: 1, option: 'Visa' },
          products: products,
        },
      }
    });
  };

  render() {
    return (
      <>
        <CartConsumer>
          {(cartValue) => {
            return (
              <CurrencyConsumer>
                {(value) => {
                  const products = [];
                  Object.entries(cartValue.state).forEach((entry) => {
                    const [key, val] = entry;
                    products.push({ val, key });
                  });

                  console.log(products);
                  this.handleCheckout(products)

                  return (
                    <>
                      <CartTitle>Cart</CartTitle>
                      <CartContainer
                        products={products}
                        totalItems={cartValue.getTotalItems()}
                        taxPrice={value.state.currentSymbol + (cartValue.getTotalPrice(value.state.currency) * 0.21).toFixed(2)}
                        totalPrice={value.state.currentSymbol + cartValue.getTotalPrice(value.state.currency)}
                        onCheckout={this.handleCheckout} // Pass the handleCheckout function
                      />
                    </>
                  );
                }}
              </CurrencyConsumer>
            );
          }}
        </CartConsumer>
      </>
    );
  }
}
