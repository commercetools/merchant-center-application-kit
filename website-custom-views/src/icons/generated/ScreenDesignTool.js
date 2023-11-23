import * as React from 'react';
const SvgScreenDesignTool = (props) => (
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
      <path id="screen-design-tool_svg__c" d="M.777 0h11.556v11.557H.777z" />
      <path id="screen-design-tool_svg__e" d="M0 16h19V0H0z" />
      <filter
        x="-.3%"
        y="-.9%"
        width="100.6%"
        height="102.5%"
        filterUnits="objectBoundingBox"
        id="screen-design-tool_svg__a"
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
        id="screen-design-tool_svg__b"
        x={0}
        y={0}
        width={1168}
        height={278}
        rx={6}
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-439 -48)">
        <use
          fill="#000"
          filter="url(#screen-design-tool_svg__a)"
          xlinkHref="#screen-design-tool_svg__b"
        />
        <use fill="#FFF" xlinkHref="#screen-design-tool_svg__b" />
      </g>
      <path
        d="M25.46 24.918h-19c-1.379 0-2.5-1.145-2.5-2.553V10.11c0-1.408 1.121-2.553 2.5-2.553h1v1.021h-1c-.828 0-1.5.687-1.5 1.532v12.255c0 .845.672 1.532 1.5 1.532h19c.826 0 1.5-.687 1.5-1.532V10.11c0-.845-.674-1.532-1.5-1.532h-1V7.557h1c1.378 0 2.5 1.145 2.5 2.553v12.255c0 1.408-1.122 2.553-2.5 2.553M10.598 27.982h11.234v-1.021H10.598z"
        fill="#42788A"
      />
      <path
        fill="#42788A"
        d="M12.13 27.471h1.02v-3.064h-1.02zM19.278 27.471H20.3v-3.064h-1.022z"
      />
      <g transform="translate(9.751 3.542)">
        <path
          d="M.5 16a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .853-.353l6 6-.706.706L1 3.707V15h11.293l-2.146-2.147.706-.706 3 3A.501.501 0 0 1 13.5 16H.5Z"
          fill="#42788A"
        />
        <path d="M6.5 13.5H3a.5.5 0 0 1-.5-.5V8.5h1v4h3v1Z" fill="#42788A" />
        <g transform="translate(6.667)">
          <mask id="screen-design-tool_svg__d" fill="#fff">
            <use xlinkHref="#screen-design-tool_svg__c" />
          </mask>
          <path
            d="m1.984 8.89 1.46 1.459L11.03 2.76c.195-.195.303-.454.303-.73 0-.276-.108-.534-.303-.729-.39-.39-1.07-.39-1.459 0L1.984 8.89Zm1.46 2.667a.499.499 0 0 1-.354-.147L.924 9.243a.498.498 0 0 1 0-.706L8.866.595a2.016 2.016 0 0 1 1.436-.594c.542 0 1.053.21 1.436.594.384.383.596.894.596 1.436 0 .543-.212 1.054-.596 1.436L3.796 11.41a.499.499 0 0 1-.353.147Z"
            fill="#42788A"
            mask="url(#screen-design-tool_svg__d)"
          />
        </g>
        <path
          d="M7.147 11.853a.501.501 0 0 1-.14-.437l.444-2.61.986.167-.326 1.916 1.914-.326.168.986-2.609.444a.499.499 0 0 1-.437-.14ZM17.337 3.829l-2.166-2.167.708-.707 2.165 2.167z"
          fill="#42788A"
        />
        <path fill="#42788A" d="m10.463 9.243-.707-.706 6.498-6.498.708.707z" />
        <mask id="screen-design-tool_svg__f" fill="#fff">
          <use xlinkHref="#screen-design-tool_svg__e" />
        </mask>
        <path
          fill="#42788A"
          mask="url(#screen-design-tool_svg__f)"
          d="M2.5 5H10V4H2.5z"
        />
      </g>
    </g>
  </svg>
);
export default SvgScreenDesignTool;
