import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { CurrencyConsumer, CurrencyContext } from '../../context/CurrencyContext';
import { GET_CURRENCIES } from '../../utils/gql-request-handler';
import { Modal } from './CurrencySelector.styles';

export default class CurrencySelector extends Component {
  clickedOutside = (e) => {
    if ( !document.getElementById('currency-modal') || document.getElementById('currency-modal').contains(e.target)){
      
    } else{
      if ( !document.getElementById('dollar-sign').contains(e.target)){
        this.context.toggleCurrencySelector();
      } 
    }
  }
  componentDidMount() {
    window.addEventListener('click', this.clickedOutside);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.clickedOutside);
  }
  render() {
    return (
      <CurrencyConsumer>
        {value => {
        if(value.state.isCurrencySelectorOn === true) {
            return(
            <Modal id="currency-modal">
                <Query query={GET_CURRENCIES}>
                    {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error : </div>;
                
                    return (
                        data.currencies.map((currencyItem, index) => {
                            return <div key={ index } onClick={() => {value.changeCurrency(index, currencyItem.symbol)}}>{currencyItem.label + " " + currencyItem.symbol}</div>
                        })
                    )
                    }}
                </Query>
            </Modal>
            )
            } else {
                return(<></>)
            }
        }}
      </CurrencyConsumer>
    )
  }
}

CurrencySelector.contextType = CurrencyContext;
