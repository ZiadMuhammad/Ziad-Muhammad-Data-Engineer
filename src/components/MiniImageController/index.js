import React, { Component } from 'react'
import { ImgBtnLeft, ImgBtnRight, ProductImage } from './MiniImageController.styles'

export default class MiniImageController extends Component {
constructor(props) {
    super(props);
    this.state = { count: 0 }
}
getNextImg = () => {
    const nextImg = Math.min(this.state.count + 1, this.props.gallery.length - 1);
    this.setState({ count: nextImg});
}
getPrevImg = () => {
    const prevImg = Math.max(this.state.count - 1, 0);
    this.setState({ count: prevImg});
}
render() {
    return (
      <>
        <ProductImage isModal={ this.props.isModal } src={ this.props.gallery[this.state.count] } />
        { this.props.gallery.length > 1 && this.props.isModal !== true ? <>
            <ImgBtnLeft onClick={() => this.getNextImg()}><img alt="Product" src="https://i.ibb.co/BZXrkhZ/Vector-1.png"/></ImgBtnLeft>
            <ImgBtnRight onClick={() => this.getPrevImg()}><img alt="Product" src="https://i.ibb.co/BZXrkhZ/Vector-1.png"/></ImgBtnRight>
        </> : <></>}
      </>
    )
  }
}
