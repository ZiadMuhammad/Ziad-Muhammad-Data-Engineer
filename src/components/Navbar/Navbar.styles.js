import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.div`
    position: relative;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
`
export const NavLinksContainer = styled.div`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 20%;
    font-size: 14px;
    text-transform: uppercase;
`

export const LogoContainer = styled.div`
  position: relative;
  width: 20%;

  & img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const CurrencyCartContainer = styled.div`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
    padding-right: 7%;
    padding-left: 30%;
`
export const NavLinkHolder = styled(NavLink)`
    width: 50%;
    height: 100%;
    padding-top: 8%;
    text-decoration: none;
    color: black;

    &:hover {
        border-bottom: 2px solid #5ECE7B;
    }

    &.active {
        border-bottom: 2px solid #5ECE7B;
    }
`

export const DollarSign = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    margin-left: -80%;
    cursor: pointer;

    & img {
        margin-bottom: 8%;
        transform: ${({ isSelected }) => isSelected ? "rotate(180deg)" : "none"};
    }
`

export const CartImg = styled.div`
    cursor: pointer;
    & img {
        width: 90%;
        margin-top: 20%;
    }

    & div {
        width: 14px;
        height: 16px;
        position: absolute;
        right: 6.5%;
        bottom: 50%;
        color: white;
        font-size: 12px;
        background-color: black;
        border-radius: 50%;
    }

    & div p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`