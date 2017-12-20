// Initial ID of contact
let currentID = 0;

export function addContact(contact) {
  const { name, phone } = contact;
  currentID += 1;

  return {
    type: "ADD_CONTACT",
    contactID: currentID,
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
