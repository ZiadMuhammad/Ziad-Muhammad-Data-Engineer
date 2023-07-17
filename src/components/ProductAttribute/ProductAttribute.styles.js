import styled from 'styled-components'

export const AttributeContainer = styled.div`
  margin-top: 4px;
  display: flex;
`

export const NormalAttribute = styled.div`
  height: ${props => (props.isModal ? "24px" : "45px")};
  width: ${props => (props.isModal ? "29px" : "63px")};
  font-size: ${props => (props.isModal ? "10px" : "0.85rem")};
  border: 1px solid #1D1F22;
  padding: 2% 8%;
  margin-right: ${props => (props.isModal ? "6%" : "2%")};
  position: relative;

  &:hover {
    background-color: black;
    color: white;
  }

  & p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const SelectedAttribute = styled.div`
  height: ${props => (props.isModal ? "24px" : "45px")};
  width: ${props => (props.isModal ? "29px" : "63px")};
  font-size: ${props => (props.isModal ? "10px" : "0.85rem")};
  border: 1px solid #1D1F22;
  padding: 2% 8%;
  margin-right: ${props => (props.isModal ? "6%" : "2%")};
  background-color: black;
  color: white;
  position: relative;

  & p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ColoredAttribute = styled.div`
    position: relative;
    width: ${props => (props.isModal ? "16px" : "32px")};
    height: ${props => (props.isModal ? "16px" : "32px")};
    margin-right: 4%;

    &:hover {
        border: 1px solid green;
    }
`;

export const Color = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 93%;
    height: 92%;
    border: ${props => props.value === "#FFFFFF" ? "1px solid black" : "none" };
    background-color: ${props => props.value};
`;

export const SelectedColor = styled.div`
    position: relative;
    width: ${props => (props.isModal ? "16px" : "32px")};
    height: ${props => (props.isModal ? "16px" : "32px")};
    border: 1px solid green;
    margin-right: 4%;
`