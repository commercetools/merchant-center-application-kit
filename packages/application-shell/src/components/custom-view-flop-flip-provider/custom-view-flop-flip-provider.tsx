import { ReactNode, useMemo } from 'react';
import memoryAdapter from '@flopflip/memory-adapter';
import { ConfigureFlopFlip } from '@flopflip/react-broadcast';
import { TFlags } from '@flopflip/types';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';

type TCustomViewFlopFlipProviderProps = {
  user?: TFetchLoggedInUserQuery['user'];
  flags?: TFlags;
  children: ReactNode;
};

function CustomViewFlopFlipProvider(props: TCustomViewFlopFlipProviderProps) {
  const adapterArgs = useMemo(
    () => ({
      user: {
        key: props.user?.id,
      },
    }),
    [props.user?.id]
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
