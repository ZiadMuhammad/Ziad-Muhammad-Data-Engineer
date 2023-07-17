import React, { Component } from 'react'
import { NavLinksContainer, NavContainer, NavLinkHolder, LogoContainer, CurrencyCartContainer, DollarSign, CartImg } from './Navbar.styles'
import { GET_CATEGORIES } from './../../utils/gql-request-handler'
import { Query } from 'react-apollo';
import { CurrencyConsumer } from '../../context/CurrencyContext';
import { CartConsumer } from '../../context/CartContext';

export default class Navbar extends Component {
  render() {
    return (
        <CurrencyConsumer>
            { value => {
            return (
            <NavContainer id="nav-container">
                <NavLinksContainer>
                    <Query query={GET_CATEGORIES}>
                        {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error : </div>;
                    
                        return (
                            data.categories.map((category, index) => {
                                return <NavLinkHolder key={index} to={'/' + category.name}>{category.name}</NavLinkHolder>
                            })
                        )
                        }}
                    </Query>
                </NavLinksContainer>
                <LogoContainer>
                    <img alt="logo" src="https://i.ibb.co/2MMM5pb/a-logo.png" />
                </LogoContainer>
                <CurrencyCartContainer>
                    <DollarSign id="dollar-sign" isSelected={value.state.isCurrencySelectorOn} onClick={() => value.toggleCurrencySelector()}>
                        <span>{value.state.currentSymbol}&nbsp;&nbsp;</span>
                        <img alt="currency" src="https://i.ibb.co/2yFMjHy/Vector.png"/>
                    </DollarSign>
                    <CartConsumer> 
                        { cartValue => {
                            return <CartImg id="cart-btn">
                                    <div><p>{cartValue.getTotalItems()}</p></div>
                                    <img alt="cart" src="https://i.ibb.co/6nJx2DH/Empty-Cart.png"/>
                                </CartImg>
                            }
                        }
                    </CartConsumer>
                </CurrencyCartContainer>
            </NavContainer>)
        }}
        </CurrencyConsumer>
    )
  }
}
