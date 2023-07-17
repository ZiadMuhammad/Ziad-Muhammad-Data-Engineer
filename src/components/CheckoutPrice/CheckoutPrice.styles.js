import styled from 'styled-components'

export const PriceP = styled.p`
    margin-top: 1%;
    margin-bottom: 1%;
    font-size: 20px;

    & span {
        font-weight: bold;
        position: absolute;
        left: 100px;
    }
`

export const OrderButton = styled.button`
  margin-top: 0.5%;
  margin-bottom: 1%;
  height: 40px;
  width: 279px;
  background-color: #5ECE7B;
  color: white;
  padding: 2px 5px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
`

export const CheckoutPriceContainer = styled.div`
  position: relative;
`