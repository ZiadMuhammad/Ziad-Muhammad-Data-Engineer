import styled from 'styled-components'

export const AttributeTitle = styled.p`
    font-size: ${props => (props.isModal ? "14px" : "16px")};
    font-weight: ${props => (props.isModal ? "normal" : "bold")};
    margin-top: 5%;
    text-transform: ${props => (props.isModal ? "capitalize" : "uppercase")};
`