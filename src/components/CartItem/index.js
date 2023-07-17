import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CartConsumer } from '../../context/CartContext';
import { CurrencyConsumer } from '../../context/CurrencyContext';
import { GET_PRODUCT } from '../../utils/gql-request-handler';
import MiniImageController from '../MiniImageController';
import ProductAttribute from '../ProductAttribute';
import { ProductPrice } from '../shared/ProductPrice.styled';
import { CartItemFlex, CartItemSubtitle, CartItemTitle, CartItemTitleModal, ImgPlaceHolder, ProductDetails, QtyFlex, QtyImageContainer, SampleFlexItem, SampleP } from './CartItem.styles';

export default class CartItem extends Component {
  currencyLabelMap = ["USD", "GBP", "AUD", "JPY", "RUB"];

  handleAddToCart(product) {
    window.dataLayer = window.dataLayer || [];

    // Push addToCart event to the data layer
    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode: this.currencyLabelMap[product.currencyCode],
        add: {
          products: [
            {
              name: product.name,
              id: product.id,
              price: product.price,
              brand: product.brand,
              quantity: product.quantity,
            },
          ],
        },
      },
    });
  }

  handleRemoveFromCart(product) {
    window.dataLayer = window.dataLayer || [];

    // Push removeFromCart event to the data layer
    window.dataLayer.push({
      event: 'removeFromCart',
      ecommerce: {
        remove: {
          products: [
            {
              name: product.name,
              id: product.id,
              price: product.price,
              brand: product.brand,
              quantity: product.quantity,
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <CartItemFlex>
        <Query query={GET_PRODUCT(this.props.product.product.productId)} fetchPolicy='no-cache'>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error : </div>;

            return (
              <>
                <ProductDetails>
                  {this.props.isModal 
                    ? 
                    <CartItemTitleModal isModal={this.props.isModal}>
                      {data.product.name}
                    </CartItemTitleModal>
                    :
                    <CartItemTitle isModal={this.props.isModal}>
                      {data.product.name}
                    </CartItemTitle>
                  }
                  <CartItemSubtitle isModal={this.props.isModal}>
                    {data.product.brand}
                  </CartItemSubtitle>
                  <ProductPrice isModal={this.props.isModal}>
                    <CurrencyConsumer>
                      {value => data.product.prices[value.state.currency].currency.symbol + data.product.prices[value.state.currency].amount}
                    </CurrencyConsumer>
                  </ProductPrice>
                  {data.product.attributes.map((attribute, index) => (
                    <ProductAttribute isModal={this.props.isModal} key={index} inStock={false} attribute={attribute} selectAttribute={null} selectedAttribute={this.props.product.product ? this.props.product.product.selectedAttributes[attribute.id] : ''} />
                  ))}
                </ProductDetails>
                <QtyImageContainer isModal={this.props.isModal}>
                  <QtyFlex>
                  <CartConsumer>
                      {cartValue => (
                        <CurrencyConsumer>
                          {value => (
                            <>
                              <SampleFlexItem isModal={this.props.isModal} onClick={() => {
                                const product = {
                                    name: data.product.name,
                                    id: this.props.product.product.productId,
                                    price: data.product.prices[0].amount.toString(),
                                    brand: data.product.brand,
                                    quantity: this.props.product.qty,
                                    currencyCode: value.state.currency

                                    };
                                cartValue.incrementItem(this.props.itemId);
                                this.handleAddToCart(product);
                              }}>
                                <p>+</p>
                              </SampleFlexItem>
                              <SampleP>{this.props.product.qty}</SampleP>
                              <SampleFlexItem isModal={this.props.isModal} onClick={() => {
                            const product = {
                                name: data.product.name,
                                id: this.props.product.product.productId,
                                price: data.product.prices[0].amount.toString(),
                                brand: data.product.brand,
                                quantity: this.props.product.qty,
                                currencyCode: value.state.currency

                                };
                                cartValue.decrementItem(this.props.itemId);
                                this.handleRemoveFromCart(product);
                              }}>
                                <p>-</p>
                              </SampleFlexItem>
                            </>
                          )}
                        </CurrencyConsumer>
                      )}
                    </CartConsumer>

                  </QtyFlex>
                  <ImgPlaceHolder>
                    <MiniImageController isModal={this.props.isModal} gallery={data.product.gallery} />
                  </ImgPlaceHolder>
                </QtyImageContainer>
              </>
            );
          }}
        </Query>
      </CartItemFlex>
    );
  }
}
