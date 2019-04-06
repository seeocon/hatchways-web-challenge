import React from "react";

const Seperator = ({ color, height, width }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: height,
      width: width
    }}
  />
);

export default Seperator;
