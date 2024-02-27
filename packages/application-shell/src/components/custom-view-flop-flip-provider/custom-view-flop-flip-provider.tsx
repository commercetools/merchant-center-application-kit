import { ReactNode, useMemo } from 'react';
import memoryAdapter from '@flopflip/memory-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { TFlags } from '@flopflip/types';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';

type TCustomViewFlopFlipProviderProps = {
  projectKey?: string;
  user?: TFetchLoggedInUserQuery['user'];
  flags?: TFlags;
  children: ReactNode;
};

function CustomViewFlopFlipProvider(props: TCustomViewFlopFlipProviderProps) {
  const adapterArgs = useMemo(
    () => ({
      user: {
        kind: 'user',
        key: props.user?.id,
        project: props.projectKey ?? '',
      },
    }),
    [props.user?.id, props.projectKey]
  );

  return (
    <ConfigureFlopFlip
      adapter={memoryAdapter}
      defaultFlags={props.flags}
      adapterArgs={adapterArgs}
    >
      {props.children}
    </ConfigureFlopFlip>
  );
}

export default CustomViewFlopFlipProvider;
