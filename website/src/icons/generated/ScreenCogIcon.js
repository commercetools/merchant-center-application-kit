import * as React from 'react';

function SvgScreenCogIcon(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-.3%"
          y="-.9%"
          width="100.6%"
          height="102.5%"
          filterUnits="objectBoundingBox"
          id="screen-cog-icon_svg__filter-2"
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
          id="screen-cog-icon_svg__path-1"
          x={0}
          y={0}
          width={1168}
          height={278}
          rx={6}
        />
        <path id="screen-cog-icon_svg__path-3" d="M0 1.163h17.504v17.504H0z" />
      </defs>
      <g
        id="screen-cog-icon_svg__App-KIT-FInal"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="screen-cog-icon_svg__App-Kit-/-Landingpage-v2-Copy-4"
          transform="translate(-118 -455)"
        >
          <g
            id="screen-cog-icon_svg__Component-/-View-/-Card"
            transform="translate(56 407)"
          >
            <g id="screen-cog-icon_svg__Background">
              <use
                fill="#000"
                filter="url(#screen-cog-icon_svg__filter-2)"
                xlinkHref="#screen-cog-icon_svg__path-1"
              />
              <use fill="#FFF" xlinkHref="#screen-cog-icon_svg__path-1" />
            </g>
          </g>
          <g id="screen-cog-icon_svg__Group-2" transform="translate(118 455)">
            <g id="screen-cog-icon_svg__Component-/-icon-/-24px-/-built">
              <path
                d="M25.46 24.918h-19c-1.379 0-2.5-1.145-2.5-2.553V10.11c0-1.408 1.121-2.553 2.5-2.553h1v1.021h-1c-.828 0-1.5.687-1.5 1.532v12.255c0 .845.672 1.532 1.5 1.532h19c.826 0 1.5-.687 1.5-1.532V10.11c0-.845-.674-1.532-1.5-1.532h-1V7.557h1c1.378 0 2.5 1.145 2.5 2.553v12.255c0 1.408-1.122 2.553-2.5 2.553"
                id="screen-cog-icon_svg__Fill-1"
                fill="#42788A"
              />
              <path
                id="screen-cog-icon_svg__Fill-4"
                fill="#42788A"
                d="M10.598 27.982h11.234v-1.021H10.598z"
              />
              <path
                id="screen-cog-icon_svg__Fill-6"
                fill="#42788A"
                d="M12.13 27.471h1.02v-3.064h-1.02z"
              />
              <path
                id="screen-cog-icon_svg__Fill-7"
                fill="#42788A"
                d="M19.278 27.471H20.3v-3.064h-1.022z"
              />
              <g
                id="screen-cog-icon_svg__Group-6"
                transform="translate(6.97 3.83)"
              >
                <g
                  id="screen-cog-icon_svg__Group-3"
                  transform="translate(0 .17)"
                >
                  <mask id="screen-cog-icon_svg__mask-4" fill="#fff">
                    <use xlinkHref="#screen-cog-icon_svg__path-3" />
                  </mask>
                  <path
                    d="M5.993 14.343c.085 0 .172.021.25.065.343.192.715.346 1.105.455a.516.516 0 01.374.496v1.248a1.03 1.03 0 002.06 0V15.36c0-.23.152-.433.374-.496.39-.11.761-.263 1.104-.455a.515.515 0 01.616.086l.88.881c.39.39 1.068.39 1.457 0 .195-.195.301-.453.301-.728 0-.275-.106-.533-.3-.728l-.884-.881a.515.515 0 01-.085-.615c.192-.343.345-.715.456-1.105a.513.513 0 01.495-.374h1.25a1.03 1.03 0 000-2.06h-1.25a.512.512 0 01-.495-.374c-.11-.39-.264-.76-.455-1.103a.515.515 0 01.084-.616l.883-.881c.195-.195.301-.454.301-.728 0-.275-.106-.534-.3-.728a1.032 1.032 0 00-1.458 0l-.88.881a.515.515 0 01-.616.085 5.225 5.225 0 00-1.104-.454.515.515 0 01-.375-.495v-1.25a1.03 1.03 0 00-2.059 0v1.25c0 .23-.153.432-.374.495-.39.11-.76.264-1.104.454a.513.513 0 01-.615-.085l-.881-.881a1.03 1.03 0 00-1.758.728c0 .274.107.533.302.728l.881.881a.517.517 0 01.085.616 5.12 5.12 0 00-.456 1.103.511.511 0 01-.494.374H2.06c-.568 0-1.03.463-1.03 1.031 0 .567.462 1.03 1.03 1.03h1.248c.23 0 .432.151.494.373.111.39.264.762.456 1.105.112.2.078.452-.085.615l-.881.881a1.023 1.023 0 00-.302.728c0 .275.107.533.302.728.39.39 1.066.39 1.456 0l.881-.881a.515.515 0 01.364-.15m2.759 4.323a2.062 2.062 0 01-2.059-2.06v-.872a5.69 5.69 0 01-.601-.248l-.616.616c-.779.779-2.135.779-2.912 0a2.043 2.043 0 01-.603-1.456c0-.55.213-1.067.603-1.456l.614-.616a6.248 6.248 0 01-.246-.601H2.06A2.062 2.062 0 010 9.915c0-1.136.924-2.06 2.06-2.06h.872c.072-.207.154-.407.246-.601l-.614-.616a2.04 2.04 0 01-.603-1.456c0-.55.213-1.067.603-1.456a2.062 2.062 0 012.912 0l.616.616c.194-.094.396-.176.601-.248v-.872c0-1.135.924-2.059 2.059-2.059 1.136 0 2.06.924 2.06 2.059v.872c.205.072.405.154.601.248l.615-.616a2.062 2.062 0 013.516 1.456c0 .55-.215 1.068-.604 1.456l-.615.616c.092.194.175.394.248.601h.872c1.135 0 2.059.924 2.059 2.06a2.062 2.062 0 01-2.059 2.059h-.872a6.618 6.618 0 01-.248.601l.615.616c.39.39.604.905.604 1.456 0 .55-.215 1.067-.604 1.456-.778.779-2.134.779-2.912 0l-.615-.616a5.933 5.933 0 01-.601.248v.872c0 1.136-.924 2.06-2.06 2.06"
                    id="screen-cog-icon_svg__Fill-1"
                    fill="#42788A"
                    mask="url(#screen-cog-icon_svg__mask-4)"
                  />
                </g>
                <path
                  d="M8.752 8.026a2.06 2.06 0 00-2.059 2.059c0 1.136.923 2.06 2.06 2.06a2.061 2.061 0 002.058-2.06 2.06 2.06 0 00-2.059-2.059m0 5.148a3.092 3.092 0 01-3.09-3.09 3.092 3.092 0 013.09-3.087 3.092 3.092 0 013.088 3.088 3.092 3.092 0 01-3.088 3.089"
                  id="screen-cog-icon_svg__Fill-4"
                  fill="#42788A"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgScreenCogIcon;
