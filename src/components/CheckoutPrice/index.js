import React, { Component } from 'react'
import { CheckoutPriceContainer, OrderButton, PriceP } from './CheckoutPrice.styles'

export default class CheckoutPrice extends Component {
  render() {
    return (
      <CheckoutPriceContainer>
        <PriceP>Tax 21%: <span>{ this.props.taxPrice }</span></PriceP>
        <PriceP>Quantity: <span>{this.props.totalItems}</span></PriceP>
        <PriceP>Total: <span>{this.props.totalPrice}</span></PriceP>
        <OrderButton>Order</OrderButton>
      </CheckoutPriceContainer>
    )
  }
}
