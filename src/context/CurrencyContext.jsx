import React, { Component } from 'react'

export const CurrencyContext = React.createContext();
const CurrencyProvider = CurrencyContext.Provider;
export const CurrencyConsumer = CurrencyContext.Consumer;

export default class Currency extends Component {
  constructor(props) {
    super(props)
    this.state = { currency: 0, isCurrencySelectorOn: false, currentSymbol: "$" }
  }
  componentDidMount() {
    const data = localStorage.getItem('currency', JSON.stringify(this.state));
    if(data) {
        this.setState(JSON.parse(data));
    } else {
        this.setState();
    }
  }
  componentDidUpdate() {
    localStorage.setItem('currency', JSON.stringify(this.state));
  }
  changeCurrency = (chosenCurrency, currentSymbol) => {
    this.setState({ ...this.state, currency: chosenCurrency , isCurrencySelectorOn: false, currentSymbol: currentSymbol})
  }
  toggleCurrencySelector = () => {
    this.setState({ ...this.state, isCurrencySelectorOn: !this.state.isCurrencySelectorOn })
  }
  render() {
    return (
      <CurrencyProvider value={{state: this.state, changeCurrency: this.changeCurrency, toggleCurrencySelector: this.toggleCurrencySelector}}>
        { this.props.children }
      </CurrencyProvider>
    )
  }
}
