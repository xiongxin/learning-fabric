
import React, { SVGProps } from 'react';

const Eraser: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      {...props}
      width="17.093"
      height="16.301"
      viewBox="0 0 17.093 16.301"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="bx-eraser"
        fill="currentColor"
        transform="translate(-2.003 -2.416)"
        d="M2.543,14.46l3.985,3.985a.923.923,0,0,0,.655.272H18.309V16.862h-6.45l6.695-6.695a1.855,1.855,0,0,0,0-2.622l-4.59-4.589a1.857,1.857,0,0,0-2.622,0l-4.4,4.4L2.532,11.849a1.86,1.86,0,0,0,.011,2.61ZM12.653,4.268l4.589,4.589-2.4,2.4L10.256,6.665l2.4-2.4Zm-4.4,4.4.689-.688,4.589,4.589L9.31,16.789a.951.951,0,0,0-.064.073H7.568L3.855,13.148l4.4-4.484Z"
      />
    </svg>
  )
}

export default Eraser
