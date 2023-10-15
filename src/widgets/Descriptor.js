import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function Descriptor(props) {
  return (
    <Typography component="h4" variant="h4" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Descriptor.propTypes = {
  children: PropTypes.node,
};

export default Descriptor;
