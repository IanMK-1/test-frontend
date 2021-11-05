import React from "react";
import NavBar from "../components/NavigationMenu/NavBar";

function ComponentBody(props) {
  const { hasNavBar, children } = props;
  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        {hasNavBar ? <NavBar /> : null}
        {children}
      </div>
    </div>
  );
}

export default ComponentBody;
