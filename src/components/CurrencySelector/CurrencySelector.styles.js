import styled from 'styled-components';

export const Modal = styled.div`
    display: block;
    position: absolute;
    top: 7%;
    left: 88%;
    width: 7%;
    padding-top: 0.5%;
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    background-color: white;
    z-index: 1;

    & div {
        height: 30px;
        padding-left: 10px;
        padding-top: 5px;
    }

    & div:hover {
        background-color: #EEEEEE;
    }
`;