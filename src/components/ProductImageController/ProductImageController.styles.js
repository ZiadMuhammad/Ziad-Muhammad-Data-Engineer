import styled from 'styled-components'

export const ImageController = styled.div`
  display: flex;
  width: 60%;
  margin-bottom: 5%;
  height: 100%;
`;

export const SelectableImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-right: 2%;

  & img {
    object-fit: contain;
    width: 100%;
    height: 100px;
    margin-bottom: 3%;
  }
`;

export const SelectedImage = styled.div`
    width: 100%;

    & img {
      object-fit: contain;
      width: 100%;
      height: 600px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
`;

