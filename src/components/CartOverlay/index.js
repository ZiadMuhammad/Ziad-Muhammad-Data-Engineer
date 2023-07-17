import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { CartConsumer } from '../../context/CartContext'
import { CurrencyConsumer } from '../../context/CurrencyContext'
import CartContainer from '../CartContainer'
import { ButtonContainer, CartContent, CartScreen, GreenBtn, linkStyle, OverlayHide, OverlayTitle, TextInLink, TotalPriceContainer } from './CartOverlay.styles'

export default class CartOverlay extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { visible: false, scroll: "" }
      }
    clickedOutside = (e) => {
    if ( document.getElementById('cart-btn').contains(e.target)){
        this.setState({ visible: !this.state.visible, scroll: this.state.scroll === "hidden" ? "" : "hidden"});
        document.body.style.setProperty("overflow", this.state.scroll)
    } else{
        if(((this.state.visible === true) && (e.target.id === "overflow-div")) || (e.target.closest('#nav-container'))) {
            this.setState({ visible: false, scroll: ""});
            document.body.style.setProperty("overflow", this.state.scroll)
        }
    }
    }
    navigatedToCart = () => {
        this.setState({ visible: !this.state.visible, scroll: ""}, () => {document.body.style.setProperty("overflow", this.state.scroll)});
    }
    componentDidMount() {
    window.addEventListener('click', this.clickedOutside);
    }
    componentWillUnmount() {
    window.removeEventListener('click', this.clickedOutside);
    }
    componentDidUpdate() {
    }
  render() {
    const isVisible = this.state.visible;
    if(isVisible) {
        return(<>
            <OverlayHide id="overflow-div" /><CartScreen id="cart-modal">
                <CartConsumer> 
                { cartValue => {
                    if (cartValue)
                    return <CurrencyConsumer>
                    {
                        value => {
                        const products = [];
                        Object.entries(cartValue.state).forEach(entry => {
                            const [key, val] = entry;
                            products.push({val, key});
                        });
                                
                        return <>
                        <OverlayTitle><p>My Bag, <span>{ cartValue.getTotalItems() + " items"}</span></p></OverlayTitle>
                        <CartContent>
                            <CartContainer isModal={ true } products={ products } totalItems={ cartValue.getTotalItems() } totalPrice={value.state.currentSymbol + cartValue.getTotalPrice(value.state.currency)} />
                        </CartContent>
                        <TotalPriceContainer>
                            <p>Total </p>
                            <p><span>{ value.state.currentSymbol + cartValue.getTotalPrice(value.state.currency) }</span></p>
                        </TotalPriceContainer>
                        <ButtonContainer>
                            <Link style={linkStyle} onClick={() => this.navigatedToCart()} to="/cart"><TextInLink>VIEW BAG</TextInLink></Link>
                            <GreenBtn>CHECKOUT</GreenBtn>
                        </ButtonContainer>
                        </>
                        }
                    }
        
                    </CurrencyConsumer>
                    }
                }
                </CartConsumer>
        </CartScreen>
        </>)
    } else {
        return <></>;
    }
  }
}
