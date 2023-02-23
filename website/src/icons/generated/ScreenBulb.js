import * as React from 'react';
const SvgScreenBulb = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    {...props}
  >
    <defs>
      <filter
        x="-.3%"
        y="-.9%"
        width="100.6%"
        height="102.5%"
        filterUnits="objectBoundingBox"
        id="screen-bulb_svg__a"
      >
        <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          stdDeviation={1}
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          in="shadowBlurOuter1"
        />
      </filter>
      <rect
        id="screen-bulb_svg__b"
        x={0}
        y={0}
        width={1168}
        height={278}
        rx={6}
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-812 -48)">
        <use
          fill="#000"
          filter="url(#screen-bulb_svg__a)"
          xlinkHref="#screen-bulb_svg__b"
        />
        <use fill="#FFF" xlinkHref="#screen-bulb_svg__b" />
      </g>
      <g fill="#42788A">
        <path d="M25.46 24.918h-19c-1.379 0-2.5-1.145-2.5-2.553V10.11c0-1.408 1.121-2.553 2.5-2.553h1v1.021h-1c-.828 0-1.5.687-1.5 1.532v12.255c0 .845.672 1.532 1.5 1.532h19c.826 0 1.5-.687 1.5-1.532V10.11c0-.845-.674-1.532-1.5-1.532h-1V7.557h1c1.378 0 2.5 1.145 2.5 2.553v12.255c0 1.408-1.122 2.553-2.5 2.553M10.598 27.982h11.234v-1.021H10.598z" />
        <path d="M12.13 27.471h1.02v-3.064h-1.02zM19.278 27.471H20.3v-3.064h-1.022zM16.132 7.345c-.167 0-.336.01-.505.028-1.924.219-3.498 1.768-3.743 3.685a4.302 4.302 0 0 0 2.639 4.531c.23.092.382.316.382.565v2.804c0 .338.274.611.61.611h1.224a.61.61 0 0 0 .61-.61v-2.805c0-.249.15-.473.382-.565a4.264 4.264 0 0 0 2.674-3.965c0-1.218-.521-2.38-1.43-3.192a4.232 4.232 0 0 0-2.843-1.087m.607 13.447h-1.223a1.835 1.835 0 0 1-1.833-1.834V16.55a5.526 5.526 0 0 1-3.011-5.645c.315-2.47 2.34-4.466 4.817-4.746a5.536 5.536 0 0 1 4.302 1.362 5.511 5.511 0 0 1 1.837 4.104 5.477 5.477 0 0 1-3.056 4.926v2.408c0 1.011-.823 1.834-1.833 1.834" />
        <path d="M14.294 18.347h3.666v-1.222h-3.666z" />
        <path d="M15.515 17.735h1.223v-4.889h-1.223z" />
        <path d="M16.127 10.404a.765.765 0 0 0 0 1.526.765.765 0 0 0 0-1.526m0 3.054a2.292 2.292 0 0 1 0-4.581 2.293 2.293 0 0 1 2.291 2.29 2.294 2.294 0 0 1-2.29 2.291" />
      </g>
    </g>
  </svg>
);
export default SvgScreenBulb;
