import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { CurrencyConsumer } from '../../context/CurrencyContext';
import { GET_PRODUCT } from '../../utils/gql-request-handler';
import ProductAttribute from '../ProductAttribute';
import ProductImageController from '../ProductImageController';
import { AddToCart } from '../shared/AddToCart.styled';
import { AttributeTitle } from '../shared/AttributeTitle.styled';
import { ProductDescription } from '../shared/ProductDescription.styled';
import { ProductPrice } from '../shared/ProductPrice.styled';
import { ProductSubtitle } from '../shared/ProductSubtitle.styled';
import { ProductTitle } from '../shared/ProductTitle.styled';
import { CenterFlex, ProductDetails, ProductInfoContainer } from './ProductInfo.styles';
import Parser from 'html-react-parser';
import { CartConsumer } from '../../context/CartContext';

export default class ProductInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  currencyLabelMap = ["USD", "GBP", "AUD", "JPY", "RUB"];

  onCompletedHandler = (data) => {
    const selectedAttributes = {};
    data.product.attributes.map((attribute, index) => {
      selectedAttributes[attribute.id] = attribute.items[0].value;
      return null;
    });

    this.setState({ currentProduct: { productId: this.props.productId, selectedAttributes: selectedAttributes, price: data.product.prices } });
  };

  onChangeAttributeValue = (id, value) => {
    this.setState((prevState) => ({
      ...prevState,
      currentProduct: {
        ...prevState.currentProduct,
        selectedAttributes: { ...prevState.currentProduct.selectedAttributes, [id]: value },
      },
    }));
  };

  handleProductDetailView(product) {
    window.dataLayer = window.dataLayer || [];

    // Push product detail event to the data layer
    window.dataLayer.push({
      ecommerce: null,
    });
    window.dataLayer.push({
      ecommerce: {
        detail: {
          actionField: { list: 'Apparel Gallery' },
          products: [
            {
              name: product.name,
              id: product.id,
              price: product.price,
              brand: product.brand,
            },
          ],
        },
      },
    });
  }

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
              quantity: 1,
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <CenterFlex>
        <Query query={GET_PRODUCT(this.props.productId)} onCompleted={this.onCompletedHandler} fetchPolicy="no-cache">
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error : </div>;

            const product = {
              name: data.product.name,
              id: this.props.productId,
              price: data.product.prices,
              brand: data.product.brand,
            };

            return (
              <ProductInfoContainer>
                <ProductImageController gallery={data.product.gallery} />
                <ProductDetails>
                  <ProductTitle>{data.product.name}</ProductTitle>
                  <ProductSubtitle>{data.product.brand}</ProductSubtitle>
                  {data.product.attributes.map((attribute, index) => (
                    <ProductAttribute
                      key={index}
                      inStock={data.product.inStock}
                      attribute={attribute}
                      selectAttribute={this.onChangeAttributeValue}
                      selectedAttribute={this.state.currentProduct ? this.state.currentProduct.selectedAttributes[attribute.id] : ''}
                    />
                  ))}

                  <AttributeTitle>Price:</AttributeTitle>
                  <ProductPrice>
                    <CurrencyConsumer>
                      {(value) => {
                        const product = {
                          name: data.product.name,
                          id: this.props.productId,
                          price: data.product.prices[value.state.currency].amount,
                          brand: data.product.brand,
                        };

                        this.handleProductDetailView(product);
                        return data.product.prices[value.state.currency].currency.symbol + data.product.prices[value.state.currency].amount;
                      }}
                    </CurrencyConsumer>
                  </ProductPrice>

                  <CartConsumer>
                    {(cartValue) => (
                      <CurrencyConsumer>
                        {(value) => {
                          const product = {
                            name: data.product.name,
                            id: this.props.productId,
                            price: data.product.prices[value.state.currency].amount,
                            brand: data.product.brand,
                            currencyCode: value.state.currency
                          };
                          
                          if (this.state.currentProduct) {
                            return data.product.inStock ? (
                              <AddToCart
                                onClick={() => {
                                  cartValue.addProduct(this.state.currentProduct);
                                  this.handleAddToCart(product);
                                }}
                              >
                                Add to Cart
                              </AddToCart>
                            ) : (
                              <></>
                            );
                          }
                        }}
                      </CurrencyConsumer>
                    )}
                  </CartConsumer>

                  <ProductDescription>{Parser(data.product.description)}</ProductDescription>
                </ProductDetails>
              </ProductInfoContainer>
            );
          }}
        </Query>
      </CenterFlex>
    );
  }
}
