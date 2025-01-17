import React, { SVGProps } from 'react';


const Circle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        id="circle-regular"
        d="M16.3,8.15A8.15,8.15,0,1,1,8.15,0,8.15,8.15,0,0,1,16.3,8.15ZM8.15,1.528A6.622,6.622,0,1,0,14.773,8.15,6.621,6.621,0,0,0,8.15,1.528Z"
      />
    </svg>
  )
}
export default Circle
