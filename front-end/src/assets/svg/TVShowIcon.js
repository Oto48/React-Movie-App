import React from "react";

const TVShowIcon = ({ fill, width, height, viewBox }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.08 4.48109H20V20H0V4.48109H4.92L2.22 1.20272L3.78 0.029098L7 3.90883L10.22 0L11.78 1.20272L9.08 4.48109ZM2 6.42095V18.0601H12V6.42095H2ZM17 14.1804H15V12.2405H17V14.1804ZM15 10.3007H17V8.36082H15V10.3007Z"
        fill={fill}
      />
    </svg>
  );
};

TVShowIcon.defaultProps = {
  fill: "#5A698F",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
};

export default TVShowIcon;
