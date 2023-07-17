import styled from 'styled-components'

export const ProductImage = styled.img`
    height: 100%;
    width: ${props => (props.isModal ? "121px" : "200px")};
    object-fit: contain;
    object-position: top;
`

export const ImgBtnLeft = styled.button`
  position: absolute;
  top: 86%;
  right: 10%;
  width: 20px;
  height: 20px;
  background-color: #000000BA;
  border: none;

  & img {
    position: relative;
    top: 5%;
    left: 10%;
    transform: rotate(180deg);
  }
`

export const ImgBtnRight = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;

  top: 86%;
  left: 65%;
  background-color: #000000BA;
  border: none;

  & img {
    position: relative;
    top: 5%;
    right: 10%;
  }

`