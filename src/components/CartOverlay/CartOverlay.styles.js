import styled from 'styled-components'

export const CartScreen = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    @media (max-width: 1920px) {
        width: 325px;
        height: 70%;   
    }
    @media (max-width: 1366px) {
        width: 325px;
        height: 80%;   
    }
    right: 5%;
    top: 8%;
    z-index: 1000;
`

export const OverlayTitle = styled.div`
    width: 100%;
    height: 15%;
    background-color: white;

    & p {
        font-weight: bold;
        position: absolute;
        top: 5%;
        left: 5%;
        font-size: 16px;

        & span {
            font-size: 16px;
            font-weight: normal;
        }
    }
`

export const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 55%;
    overflow-y: scroll;
    background-color: white;
`

export const TotalPriceContainer = styled.div`
    display: flex;
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 2%;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    background-color: white;

    & p {
        font-weight: bold;
        font-size: 16px;
    }

    & span {
        font-weight: bold;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    height: 80px;
    background-color: white;
`

export const GreenBtn = styled.button`
  height: 80%;
  width: 45%;
  background-color: #5ECE7B;
  color: white;
  padding: 2px 5px;
  border: none;
  cursor: pointer;
  font-size: small;
`

export const BagBtn = styled.a`
  height: 60px;
  width: 100%;
  color: black;
  padding: 2px 5px;
  border: 1px solid #1D1F22;
  background-color: white;
  cursor: pointer;
`

export const OverlayHide = styled.div`
    display: block;
    position: absolute;
    top: 8%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.7);
    z-index: 2;
    overflow-y: hidden;
`

export const linkStyle = {
    height: "80%",
    width: "45%",
    position: "relative",
    color: "black",
    padding: "2px 5px",
    border: "1px solid #1D1F22",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "small"
};

export const TextInLink = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`