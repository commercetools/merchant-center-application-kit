import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

const SpecRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing30};
  /* Absorbs a small height change so it doesn't shift every state below it. */
  min-height: 56px;
`;

const Box = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ?? designTokens.colorSurface};
`;

const Label = styled.div`
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize30};
  color: ${designTokens.colorSolid};
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
const GroupLabel = styled.div`
  align-self: flex-start;
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize20};
  font-weight: ${designTokens.fontWeight600};
  color: ${designTokens.colorAccent};
  background-color: ${designTokens.colorAccent90};
  border-radius: ${designTokens.borderRadius4};
  padding: ${designTokens.spacing10} ${designTokens.spacing20};
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
    <Box backgroundColor={backgroundColor}>{children}</Box>
    <Label>{label}</Label>
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
