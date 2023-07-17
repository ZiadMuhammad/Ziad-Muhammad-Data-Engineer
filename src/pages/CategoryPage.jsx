import React, { PureComponent } from 'react'
import ProductsContainer from '../components/ProductsContainer'
import CatNameHeader from '../components/shared/CatNameHeader.styled'

export default class CategoryPage extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { categoryName } = this.props.match.params;

    return (
      <>
        <CatNameHeader>{categoryName}</CatNameHeader>
        <ProductsContainer categoryName={categoryName} />
      </>
    );
  }

}
