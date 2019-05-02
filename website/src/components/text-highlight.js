import styled from '@emotion/styled';
import * as colors from '../colors';

const TextHighlight = styled.span`
  background-image: linear-gradient(
    ${colors.light.primarySoft},
    ${colors.light.primarySoft}
  );
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 85%;
`;

export default TextHighlight;
