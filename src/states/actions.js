export function addContact(contact) {
  const { contactID, name, phone } = contact;

  return {
    type: "ADD_CONTACT",
    contactID,
    name,
    phone
  };
}

export function removeContact(contactID) {
  return {
    type: "REMOVE_CONTACT",
    contactID
  };
}
