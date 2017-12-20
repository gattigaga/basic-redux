import React from "react";
import PropTypes from "prop-types";

import "../assets/css/ContactItem.css";

const ContactItem = ({ name, phone, onClickDelete }) => (
  <div className="ContactItem">
    <p className="ContactItem__name">{name}</p>
    <p className="ContactItem__phone">{phone}</p>
    <button
      type="button"
      className="ContactItem__button"
      onClick={onClickDelete}
    >
      Delete
    </button>
  </div>
);

ContactItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onClickDelete: PropTypes.func
};

ContactItem.defaultProps = {
  name: "Anonymous",
  phone: "+62 xx xxx xxx xxx",
  onClickDelete: () => {}
};

export default ContactItem;
