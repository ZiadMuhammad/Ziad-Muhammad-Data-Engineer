import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import { Route, Switch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import CurrencySelector from './components/CurrencySelector';
import ProductPage from './pages/ProductPage';
import Cart from './context/CartContext';
import Currency from './context/CurrencyContext';
import CartOverlay from './components/CartOverlay';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Cart>
          <Currency>
            <Navbar />
            <CurrencySelector />
            <Switch>
              <Route exact path="/" component={ CategoryPage } />
              <Route exact path="/cart" component={ CartPage } />
              <Route exact path="/:categoryName" render={ (props) => <CategoryPage {...props} /> }/>
              <Route path="/products/:productId" render={ (props) => <ProductPage {...props} /> }/>
            </Switch>
            {ReactDOM.createPortal(<CartOverlay />, document.getElementById("portal-root"))}

          </Currency>
        </Cart>
      </ApolloProvider>
    )
  }
}
