import React, { Component } from 'react';
import ProductCard from '../ProductCard';
import { CenterProducts, ContainProducts } from './ProductsContainer.styles';
import { Query } from 'react-apollo';
import { GET_ALL_PRODUCTS, GET_PRODUCTS } from '../../utils/gql-request-handler';
import { CurrencyConsumer } from '../../context/CurrencyContext' // Import CurrencyConsumer from Currency component

export default class ProductsContainer extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <CenterProducts>
        <ContainProducts>
          <CurrencyConsumer>
            {(currencyContext) => (
              <Query
                query={this.props.categoryName ? GET_PRODUCTS(this.props.categoryName) : GET_ALL_PRODUCTS}
                fetchPolicy="no-cache"
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading...</div>;
                  if (error) return <div>Error : </div>;

                  // Access currency value from the context
                  const { currency } = currencyContext.state;
                  
                  // Push products to the data layer with the relevant currency
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    ecommerce: {
                      currencyCode: data.category.products[0].prices[currency].currency.label,
                      impressions: data.category.products.map((product, index) => ({
                        name: product.name,
                        id: product.id,
                        price: product.prices[currency].amount,
                        brand: product.brand,
                        category: this.props.categoryName,
                        list: 'Search Results',
                        position: index + 1,
                      })),
                    },
                  });

                  return data.category.products.map((product, index) => (
                    <ProductCard
                      key={index}
                      prodId={product.id}
                      brand={product.brand}
                      attributes={product.attributes}
                      inStock={product.inStock}
                      imgSrc={product.gallery[0]}
                      name={product.name}
                      price={product.prices}
                      category={this.props.categoryName}
                    />
                  ));
                }}
              </Query>
            )}
          </CurrencyConsumer>
        </ContainProducts>
      </CenterProducts>
    );
  }
}
