import React, { Component } from 'react'
import CartItem from '../CartItem'
import CheckoutPrice from '../CheckoutPrice'
import { CartCenter, CartList, HorizontalLine } from './CartContainer.styles'

export default class CartContainer extends Component {
  render() {
    return (
      <CartCenter>
        <CartList>
            { this.props.isModal ? <></> : <HorizontalLine /> }
            {this.props.products.map((item, index) => {
                const {key, val} = item;
                if(val) {
                return <div key={ index }>
                    <CartItem isModal={ this.props.isModal } itemId = { key } product = { val } />
                    <HorizontalLine />
                </div>
                } else {
                  return null;
                }
            })}
            { this.props.isModal ? <></> : <CheckoutPrice totalPrice={ this.props.totalPrice } taxPrice = { this.props.taxPrice } totalItems={ this.props.totalItems } ></CheckoutPrice>} 
        </CartList>
      </CartCenter>
    )
  }
}
