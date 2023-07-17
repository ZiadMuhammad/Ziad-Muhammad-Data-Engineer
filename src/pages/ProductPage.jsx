import React, { Component } from 'react'
import ProductInfo from '../components/ProductInfo'

export default class ProductPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
     <ProductInfo productId={ this.props.match.params.productId } />
    )
  }
}
