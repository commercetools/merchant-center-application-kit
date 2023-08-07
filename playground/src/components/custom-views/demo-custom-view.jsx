import { useEffect, useState } from 'react';
import { CustomViewShell } from '@commercetools-frontend/application-shell';

export const CUSTOM_VIEW_ID = '290f83df-d86d-417c-ab24-41697e33483c';

function DemoCustomView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.app.customViewId = CUSTOM_VIEW_ID;
    document.querySelector('.loading-screen').remove();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading custom view...</div>;
  }

  return (
    <CustomViewShell customViewId={CUSTOM_VIEW_ID} messages={{}}>
      <h2>Demo Custom View</h2>
    </CustomViewShell>
  );
}

export default DemoCustomView;
