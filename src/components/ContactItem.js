import React from "react";
import PropTypes from "prop-types";

const ContactItem = ({ name, phone }) => (
  <div className="ContactItem">
    <p className="ContactItem__name">{name}</p>
    <p className="ContactItem__phone">{phone}</p>
  </div>
);

ContactItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string
};

ContactItem.defaultProps = {
  name: "Anonymous",
  phone: "+62 xx xxx xxx xxx"
};

export default ContactItem;
