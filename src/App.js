import React, { Component } from "react";
import { connect } from "react-redux";

import ContactList from "./components/ContactList";
import ContactItem from "./components/ContactItem";

import { addContact, removeContact } from "./states/actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: ""
    };
  }

  render() {
    const { name, phone } = this.state;
    const { contacts, addNewContact, removeExistingContact } = this.props;

    return (
      <div className="App">
        <div>
          <input
            type="text"
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br />
          <input
            type="text"
            value={phone}
            onChange={event => this.setState({ phone: event.target.value })}
          />
          <br />
          <button
            type="button"
            onClick={() => {
              this.setState({ name: "", phone: "" });
              addNewContact({ name, phone });
            }}
          >
            Add New Contact
          </button>
        </div>
        <ContactList>
          {contacts.map(contact => {
            return (
              <ContactItem
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                onClickDelete={() => removeExistingContact(contact.id)}
              />
            );
          })}
        </ContactList>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({
  contacts
});

const mapDispathToProps = dispatch => ({
  addNewContact: contact => {
    dispatch(addContact(contact));
  },
  removeExistingContact: contactID => {
    dispatch(removeContact(contactID));
  }
});

export default connect(mapStateToProps, mapDispathToProps)(App);
