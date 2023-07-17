import React, { Component } from 'react'
import { AttributeTitle } from '../shared/AttributeTitle.styled'
import { AttributeContainer, Color, ColoredAttribute, NormalAttribute, SelectedAttribute, SelectedColor } from './ProductAttribute.styles'

export default class ProductAttribute extends Component {
  render() {
    if(this.props.attribute.type === "swatch") {
        return <>
        <AttributeTitle isModal={ this.props.isModal }>{this.props.attribute.name}:</AttributeTitle>
        <AttributeContainer>
            {this.props.attribute.items.map((item, index) => {
                if(item.value === this.props.selectedAttribute) {
                    return <SelectedColor key={ index } isModal={this.props.isModal}><Color value={item.value}/></SelectedColor>
                } else {
                    return <ColoredAttribute key={ index } isModal={this.props.isModal} onClick={() => this.props.inStock ? this.props.selectAttribute(this.props.attribute.id, item.value) : null }><Color value={item.value}/></ColoredAttribute>
                }
            })}
        </AttributeContainer></>
    } else {
        return(<>
            <AttributeTitle isModal={ this.props.isModal }>{this.props.attribute.name}:</AttributeTitle>
            <AttributeContainer>
            {this.props.attribute.items.map((item, index) => {
                if(item.value === this.props.selectedAttribute) {
                    return <SelectedAttribute key={ index } isModal={this.props.isModal}><p>{item.value}</p></SelectedAttribute>  
                } else {
                    return <NormalAttribute key={ index } isModal={this.props.isModal} onClick={() => this.props.inStock ? this.props.selectAttribute(this.props.attribute.id, item.value) : null}><p>{item.value}</p></NormalAttribute>   
                }
            })}
            </AttributeContainer></>)
    }
  }
}