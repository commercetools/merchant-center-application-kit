import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

/* `flex-start`, not the default `stretch`, or the box stops shrink-wrapping and
   this helper loses the one thing that distinguishes it from `VisualSpecGroup`. */
const SpecRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing20};
  /* Absorbs a small height change so it doesn't shift every state below it. */
  min-height: 96px;
`;

const Box = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ?? designTokens.colorSurface};
`;

/* Gray, not a tinted family: a colored chip next to a component reads as part of
   that component's state. */
const Label = styled.div`
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize30};
  color: ${designTokens.colorSolid};
  background-color: ${designTokens.colorNeutral90};
  border-radius: ${designTokens.borderRadius4};
  padding: ${designTokens.spacing10} ${designTokens.spacing20};

  &::after {
    content: ':';
  }
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${designTokens.spacing50};
`;

/* Bounds each state, so trailing space inside a short one reads as part of that state
   rather than as a gap. Also the scroll container for sticky descendants. */
const GroupBody = styled.div`
  border: 1px solid ${designTokens.colorNeutral90};
  border-radius: ${designTokens.borderRadius6};
  overflow: hidden;
`;

/* A chip rather than a heading, so it reads as a marker and never as component chrome. */
const GroupLabel = styled(Label)`
  align-self: flex-start;
  margin-bottom: ${designTokens.spacing20};
`;

type TVisualSpecProps = {
  label: string;
  backgroundColor?: string;
  children?: ReactNode;
};

type TVisualSpecGroupProps = {
  label: string;
  children?: ReactNode;
};

const VisualSpec = ({ label, backgroundColor, children }: TVisualSpecProps) => (
  <SpecRow>
    <Label>{label}</Label>
    <Box backgroundColor={backgroundColor}>{children}</Box>
  </SpecRow>
);

VisualSpec.displayName = 'VisualSpec';

export const VisualSpecGroup = ({ label, children }: TVisualSpecGroupProps) => (
  <GroupContainer>
    <GroupLabel>{label}</GroupLabel>
    <GroupBody>{children}</GroupBody>
  </GroupContainer>
);

VisualSpecGroup.displayName = 'VisualSpecGroup';

export default VisualSpec;
