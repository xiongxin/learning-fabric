import React, { SVGProps } from 'react';


const Triangle: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      {...props}
      width="17.874"
      height="15.711"
      viewBox="0 0 17.874 15.711"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="triangle"
        fill="currentColor"
        transform="translate(-1.996 -3.203)"
        d="M19.75,17.574,11.71,3.656a.893.893,0,0,0-1.554,0L2.116,17.574a.893.893,0,0,0,.777,1.34h16.08a.893.893,0,0,0,.777-1.34ZM4.438,17.127,10.933,5.889l6.495,11.238Z"
      />
    </svg>
  )
}
export default Triangle
