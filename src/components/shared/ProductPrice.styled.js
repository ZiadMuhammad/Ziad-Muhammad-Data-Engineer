import styled from 'styled-components';

export const ProductPrice = styled.p`
    margin-top:  ${props => (props.isModal ? "7%" : "20px")};
    margin-bottom:  ${props => (props.isModal ? "7%" : "20px")};
    font-size: ${props => (props.isModal ? "16px" : "24px")};
    font-weight: bold;
`