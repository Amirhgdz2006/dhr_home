// Import font files as modules (only weights actually used in the app)
import regularFont from './assets/fonts/IRANYekanX-Regular.woff2';
import mediumFont from './assets/fonts/IRANYekanX-Medium.woff2';
import demiBoldFont from './assets/fonts/IRANYekanX-DemiBold.woff2';
import boldFont from './assets/fonts/IRANYekanX-Bold.woff2';

// Create style element with font-face declarations
const style = document.createElement('style');
style.textContent = `
@font-face {
  font-family: 'IRANYekanX';
  src: url('${regularFont}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IRANYekanX';
  src: url('${mediumFont}') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IRANYekanX';
  src: url('${demiBoldFont}') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IRANYekanX';
  src: url('${boldFont}') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`;

document.head.appendChild(style);

