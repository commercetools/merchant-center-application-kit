function hasJsxRuntime() {
  if (process.env.ENABLE_NEW_JSX_TRANSFORM !== 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
}

export default hasJsxRuntime;
