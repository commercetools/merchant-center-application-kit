import { useEffect } from 'react';
import { markOnce, type TShellPerformanceMark } from '../../utils';

const PerformanceMark = ({ mark }: { mark: TShellPerformanceMark }) => {
  useEffect(() => {
    markOnce(mark);
  }, [mark]);
  return null;
};

export default PerformanceMark;
