import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CartConsumer } from '../../context/CartContext';
import { CurrencyConsumer } from '../../context/CurrencyContext';
import { Card, OutOfStockOverlay, OutOfStockText, Price } from './ProductCard.styled';

export default class ProductCard extends Component {
  currencyLabelMap = ["USD", "GBP", "AUD", "JPY", "RUB"];

  handleProductClick(product) {
    window.dataLayer = window.dataLayer || [];

    // Push productClick event to the data layer
    window.dataLayer.push({
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: { list: 'Search Results' },
          products: [
            {
              name: product.name,
              id: product.id,
              price: product.price,
              brand: product.brand,
              category: product.cat,
              variant: product.variant,
              position: product.position,
            },
          ],
        },
      },
      eventCallback: function () {
        document.location = product.url;
      },
    });
  }

  handleAddToCart(product) {
    window.dataLayer = window.dataLayer || [];

    // Push addToCart event to the data layer
    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: this.currencyLabelMap[product.currency],
        add: {
          products: [
            {
              name: product.name,
              id: product.id,
              price: product.price,
              brand: product.brand,
              quantity: 1,
            },
          ],
        },
      },
    });
  }

  render() {
    const {
      inStock,
      imgSrc,
      name,
      brand,
      price,
      prodId,
      attributes,
    } = this.props;

    return (
      <CurrencyConsumer>
        {(currencyContext) => {
          if (!inStock) {
            return (
              <Card>
                <Link to={'/products/' + prodId}>
                  <OutOfStockOverlay isOutOfStock={!inStock}>
                    <img alt="out of stock" src={imgSrc} />
                    <p>
                      {name} {brand}
                    </p>
                    <OutOfStockText>Out of Stock</OutOfStockText>
                    <Price>
                      {currencyContext.state.currentSymbol +
                        price[currencyContext.state.currency].amount}
                    </Price>
                    <button onClick={(e) => e.preventDefault()}>
                      <img
                        alt="cart"
                        src="https://i.ibb.co/6nJx2DH/Empty-Cart.png"
                      />
                    </button>
                  </OutOfStockOverlay>
                </Link>
              </Card>
            );
          } else {
            const selectedAttributes = {};
            attributes.map((attribute, index) => {
              selectedAttributes[attribute.id] = attribute.items[0].value;
              return null;
            });

            const productObj = {
              name: name,
              id: prodId,
              price: price[currencyContext.state.currency].amount,
              brand: brand,
              cat: this.props.category,
              position: 1,
              url: '/products/' + prodId,
              currency: currencyContext.state.currency,
            };

            return (
                <Card>
                <Link
                    to={'/products/' + prodId}
                    onClick={(e) => {
                    e.preventDefault();
                    this.handleProductClick(productObj);
                    }}
                >
                    <img alt="product" src={imgSrc} />
                    <p>
                    {name} {brand}
                    </p>
                    <Price>
                    {currencyContext.state.currentSymbol +
                        price[currencyContext.state.currency].amount}
                    </Price>
                    <CartConsumer>
                    {(cartValue) => (
                        
                        <div onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={(e) => {
                            e.preventDefault();
                            this.handleAddToCart(productObj);
                            cartValue.addProduct({
                                productId: prodId,
                                selectedAttributes: selectedAttributes,
                                price: price,
                            });
                            }}
                        >
                            <img
                            alt="cart"
                            id="center-img"
                            src="https://i.ibb.co/VVS6T1V/Empty-Cart.png"
                            />
                        </button>
                        </div>
                    )}
                    </CartConsumer>
                </Link>
                </Card>
            );
    
          }
        }}
      </CurrencyConsumer>
    );
  }
}
