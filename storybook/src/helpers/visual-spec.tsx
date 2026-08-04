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
  margin-bottom: ${designTokens.spacing40};
`;

const GroupLabel = styled.div`
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize40};
  font-weight: ${designTokens.fontWeight600};
  color: ${designTokens.colorSolid};
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

// Chromatic replacement for the Percy app's `Spec`; kept identical to ui-kit's helper.
const VisualSpec = ({ label, backgroundColor, children }: TVisualSpecProps) => (
  <SpecRow>
    <Box backgroundColor={backgroundColor}>{children}</Box>
    <Label>{label}</Label>
  </SpecRow>
);

VisualSpec.displayName = 'VisualSpec';

// Heading over a run of `VisualSpec`s sharing an axis, so their labels don't repeat it.
export const VisualSpecGroup = ({ label, children }: TVisualSpecGroupProps) => (
  <GroupContainer>
    <GroupLabel>{label}</GroupLabel>
    {children}
  </GroupContainer>
);

VisualSpecGroup.displayName = 'VisualSpecGroup';

export default VisualSpec;
