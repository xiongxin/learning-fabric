import React, { SVGProps } from 'react';


const Rectangle: React.FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      {...props}
      width="16.301"
      height="16.301"
      viewBox="0 0 16.301 16.301"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        id="square-regular"
        transform="translate(0 -32)"
        d="M13.972,32A2.33,2.33,0,0,1,16.3,34.329V45.972A2.331,2.331,0,0,1,13.972,48.3H2.329A2.33,2.33,0,0,1,0,45.972V34.329A2.329,2.329,0,0,1,2.329,32Zm0,1.747H2.329a.582.582,0,0,0-.582.582V45.972a.583.583,0,0,0,.582.582H13.972a.584.584,0,0,0,.582-.582V34.329A.583.583,0,0,0,13.972,33.747Z"
      />
    </svg>
  )
}
export default Rectangle
