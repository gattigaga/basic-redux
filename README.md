## Redux in Simple Way

You feel complicated about your application state become more complex, but you don't know how to manage that. The state passing into several components sometimes hard to trace. If that happens to you, so you need Redux. And this is the example of the complicated states.

![Redux Logic](https://gattigaga.com/static/complicated-states-e1c1ddcae3ae727e6488d8e6f0a38138-7b6f8.png "Redux logic")

Redux is lightweight Javascript library which can help you manage your application state globally. It can integrate with Javascript Framework or Library like Angular and React. And this is the example if you use Redux.

![Redux action](https://gattigaga.com/static/redux-states-c41d496c70f214c1aabdef9fa4a554ce-7b6f8.png "Redux action")


Yeah, You was like me. I don't find good Redux tutorials in internet too. But now I can explain it to you as easy as possible.

# Explanation

Redux has three main parts:

- Actions
- Reducers
- Store

**Actions** are payloads of information that send data from your application to the store. Actions are just a plain Javascript object. It needs a property named **type** to indicate action behavior (you can assign it with whatever value you want) and property named whatever which can contains application data.


```javascript
// Contains all data needed
// for a new contact
{
  type: 'ADD_CONTACT',
  contactID: 1,
  name: 'Gattigaga Hayyuta Dewa',
  phone: '+62 777 777 777'
}

// Contains contactID for reference
// to delete a contact
{
  type: 'REMOVE_CONTACT',
  contactID: 1
}
```

**Reducers** are function which specify how application state changes after dispatch. The function name will become your state name and it needs two arguments, **state** and **action**. State argument should has default value of state and Action argument which is action you dispatch. You should not mutate state argument directly.

```javascript
function contacts(state = [], action) {
  switch (action.type) {
    case "ADD_CONTACT":
      const { contactID, name, phone } = action;

      return [
        ...state,
        {
          contactID,
          name,
          phone
        }
      ];
    default:
      return state;
  }
}
```

**Store** is the single source of truth which hold your application states. You should only have a single store in your application.

# Practice

Okay, let's practice now. We will create Contact App using React, which has features like add new contact and remove existing contact. First, you should create React project with **create-react-app** from your Terminal.

````
create-react-app learn-redux
````

And then install **redux** and **react-redux**.

````
npm install --save redux react-redux

or

yarn add redux react-redux
````


Create some Action Creators in **src/states/actions.js**. Oh yeah, I forgot to explain what Action Creator is. Action Creator is just a function returning action.

`````javascript
// Initial ID of contact
let currentID = 0;

export function addContact(contact) {
  const { name, phone } = contact;
  currentID += 1;

  return {
    type: "ADD_CONTACT",
    id: currentID,
    name,
    phone
  };
}

export function removeContact(id) {
  return {
    type: "REMOVE_CONTACT",
    id
  };
}
`````

Next, create a reducer in **src/states/reducers.js**.

````javascript
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
  // Your other reducers
});

export default Reducers;
````

Now let's create the store in **src/index.js**.

`````javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import Reducers from "./states/reducers";

// Create store from Reducers
const store = createStore(Reducers);

ReactDOM.render(
  // Make the store available to all container components
  // without passing it explicitly
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
`````

And then create a component to contains contact item in **src/components/ContactList.js**.


````javascript
import React from "react";

const ContactList = ({ children }) => (
  <div className="ContactList">{children}</div>
);

export default ContactList;
````


And create contact item itself **src/components/ContactItem.js**.


`````javascript
import React from "react";

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

export default ContactItem;
`````

And in **src/App.js** we put all logic in it.

````javascript
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
        <div className="App__form">
          <input
            type="text"
            value={name}
            onChange={event => this.setState({ name: event.target.value })}
            className="App__input"
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            value={phone}
            onChange={event => this.setState({ phone: event.target.value })}
            className="App__input"
            placeholder="Phone"
          />
          <br />
          <button
            type="button"
            onClick={() => {
              if (!name || !phone) {
                alert("Field cannot be empty !");
                return;
              }

              this.setState({ name: "", phone: "" });
              addNewContact({ name, phone });
            }}
            className="App__button"
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

// Get your state and passing to your App component as props
const mapStateToProps = ({ contacts }) => ({
  contacts
});

// Create functionality which need to use dispatch
const mapDispatchToProps = dispatch => ({
  addNewContact: contact => {
    dispatch(addContact(contact));
  },
  removeExistingContact: contactID => {
    dispatch(removeContact(contactID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
````


This is the result. You can create new contact and remove existing contact.

![Result](https://gattigaga.com/static/learning-result-ef41e1c33f0d1e0d6e1a66f8cef7af06-85cc6.png 'result')

# Conclusion

More larger-scale app usually has more complicated state need to manage. But with Redux, you can create application with non-complicated state. You can manage your application states globally. So, don't worry to use Redux if your application state was complicated and hard to manage. For the last word, You can clone the example code with additional styles from this [repo](https://github.com/gattigaga/basic-redux).

Cheers !
