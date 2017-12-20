import { combineReducers } from "redux";

function contacts(state = [], action) {
  switch (action.type) {
    case "ADD_CONTACT":
      const { contactID, name, phone } = action;

      // Adding new contact to the list
      return [
        ...state,
        {
          contactID,
          name,
          phone
        }
      ];
    case "REMOVE_CONTACT":
      const { contactID } = action;

      // Removing a contact from the list
      return state.filter(contact => contact.id !== contactID);
    default:
      return state;
  }
}

const Reducers = combineReducers({
  contacts
});

export default Reducers;
