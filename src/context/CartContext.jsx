import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const CartContext = React.createContext();
const CartProvider = CartContext.Provider;
export const CartConsumer = CartContext.Consumer;

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const data = localStorage.getItem('cartItems');
    if(data) {
        this.setState(JSON.parse(data));
    } else {
        this.setState();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('cartItems', JSON.stringify(this.state));
  }
  setCurrentProduct = (productId, selectedAttributes) => {
    this.setState({ ...this.state, currentProduct: { prodcuctId: productId, selectedAttributes: selectedAttributes } })
  }
  incrementItem = (key) => {
    this.setState(prevState => ({ ...prevState, [key]: { ...prevState[key], qty: prevState[key].qty + 1 } }));
  }
  decrementItem = (key) => {
    if(this.state[key].qty === 1) {
        this.setState(prevState => ({ ...prevState, [key]: undefined }));
    } else {
        this.setState(prevState => ({ ...prevState, [key]: { ...prevState[key], qty: prevState[key].qty - 1 } }));
    }
  }
  getTotalItems = () => {
    let totalItems = 0;
    Object.entries(this.state).forEach(entry => {
        const [, val] = entry;
        if(val) {
            totalItems += val.qty
        }
    });

    return totalItems;
  }
  getTotalPrice = (currencyIndex) => {
    let totalPrice = 0;

    Object.entries(this.state).forEach(entry => {
        const [, val] = entry;
        if(val) {
            totalPrice += val.qty * val.product.price[currencyIndex].amount;
        }
    });

    return totalPrice.toFixed(2);
  }
  areAttributesEqual = (item1, item2) => {
    let chosenItem = item1;

    Object.entries(item1.selectedAttributes).forEach(entry => {
        const [key, val] = entry;
        if(val !== item2.selectedAttributes[key]) {
            chosenItem = undefined;
        }
    });

    return chosenItem;
  }
  checkIfItemExists = (product) => {
    const currentState = this.state;
    let itemKey = undefined;
    Object.entries(currentState).forEach(entry => {
        const [key, val] = entry;
        if(val !== undefined && val.product.productId === product.productId) {
            const similarItem = this.areAttributesEqual(val.product, product)
            if(similarItem) {
                itemKey = key
            } 
        }
    });

    if(itemKey) {
        return itemKey;
    } else {
        return undefined;
    }
  }
  addProduct = (product) => {
    const similarItem = this.checkIfItemExists(product); 
    if(similarItem) {
        this.setState(prevState => ({ ...prevState, [similarItem]: { ...prevState[similarItem], qty: prevState[similarItem].qty + 1 } }))
    } else {
        const productUid = uuidv4();
        this.setState({ ...this.state, [productUid]: { product, qty: 1 } });
    }
  }
  render() {
    return (
      <CartProvider value={ { state: this.state, addProduct: this.addProduct, incrementItem: this.incrementItem, decrementItem: this.decrementItem , getTotalItems: this.getTotalItems, getTotalPrice: this.getTotalPrice } }>
        { this.props.children }
      </CartProvider>
    )
  }
}
