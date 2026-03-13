export function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    ua.indexOf('FBAN') > -1 ||
    ua.indexOf('FBAV') > -1 ||
    ua.indexOf('Messenger') > -1 ||
    ua.indexOf('Instagram') > -1 ||
    ua.indexOf('Line') > -1 // Line app also has issues
  );
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
