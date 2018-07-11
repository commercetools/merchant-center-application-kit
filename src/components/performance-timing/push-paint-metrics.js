import fetch from 'unfetch';

const pushPaintMetrics = ({ url, paintMetrics }) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(paintMetrics),
    credentials: 'include',
    headers,
  });
};

export default pushPaintMetrics;
