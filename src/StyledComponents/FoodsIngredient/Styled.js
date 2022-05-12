import styled from 'styled-components';
import { text } from '../Paletas';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 80px;
`;

export const Card = styled.button`
  margin: 8px;
  border: none;
  background-color: transparent;
  img {
    width: 80px;
  }

  h4 {
    font-size: 1em;
    color: ${text.paragraph};
  }
`;