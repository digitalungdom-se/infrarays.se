// import React from "react";
// import logo from "config/logo.png";
// import styled from "styled-components";

import Image from "next/image";

// const StyledImg = styled.img`
//   max-width: ${({ maxHeight }: { maxHeight?: string | number }) =>
//     maxHeight || "300px"};
//   max-height: ${({ maxHeight }: { maxHeight?: string | number }) =>
//     maxHeight || "70px"};
//   &.center {
//     margin: 20px auto;
//     display: block;
//   }
// `;

// interface LogoProps {
//   center?: boolean;
//   maxHeight?: string | number;
//   maxWidth?: string | number;
// }

// const Logo: React.FC<LogoProps> = ({ maxHeight, center }) => (
//   <StyledImg
//     maxHeight={maxHeight}
//     src={logo}
//     className={`App-logo ${center && "center"}`}
//     alt="logo"
//   />
// );

// export default Logo;

export default function Logo() {
  return (
    <div className="w-max-sm relative h-24 my-12">
      <Image src="/rays.png" layout="fill" objectFit="contain" alt="Logo" />
    </div>
  );
}
