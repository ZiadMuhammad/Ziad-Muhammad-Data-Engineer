import React, { Component } from 'react'
import { ImageController, SelectableImages, SelectedImage } from './ProductImageController.styles'

export default class ProductImageController extends Component {
  constructor(props) {
    super(props)
    this.state = { chosenImg: this.props.gallery[0] }
    }
    changeImage(imgIndex) {
        this.setState({chosenImg: this.props.gallery[imgIndex]})
    }   
  render() {
    return (
      <ImageController>
        <SelectableImages>
            {this.props.gallery.map((currentImg, index) => {
                return <img alt="gallery" key={ index } onClick={() => this.changeImage(index)} src={currentImg} />
            })}
        </SelectableImages>
        <SelectedImage>
            <img alt="selected" src={this.state.chosenImg}/>
        </SelectedImage>
      </ImageController>
    )
  }
}
