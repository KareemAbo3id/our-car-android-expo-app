/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

// react function /////////////////////////
export default function useLink() {
  const [WEBresult, setWEBResult] = useState(null);

  const _handlePressButtonAsync = async (link) => {
    await WebBrowser.openBrowserAsync(link);
    setWEBResult(WEBresult);
  };

  // the hook
  return _handlePressButtonAsync;
}
