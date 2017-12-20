import { combineReducers } from "redux";

function contacts(state = [], action) {
  switch (action.type) {
    case "ADD_CONTACT":
      // Adding new contact to the list
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          phone: action.phone
        }
      ];
    case "REMOVE_CONTACT":
      // Removing a contact from the list
      return state.filter(contact => contact.id !== action.id);
    default:
      return state;
  }
}

const Reducers = combineReducers({
  contacts
});

export default Reducers;
