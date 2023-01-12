import React from 'react';
import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './Filter/Filter.jsx';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const list = localStorage.getItem('contacts');
    const parseList = JSON.parse(list);

    if (parseList) {
      this.setState({ contacts: parseList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handlerChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  formHandlerSubmit = data => {
    const array = this.state.contacts.filter(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (array.length > 0) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => {
        return { contacts: [data, ...prevState.contacts] };
      });
    }
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingLeft: '50px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formHandlerSubmit} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.handlerChangeFilter}
        />
        {this.state.contacts.length > 0 ? (
          <ContactList
            filteredContacts={this.filterContacts()}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p
            style={{
              color: 'green',
              fontSize: '40px',
            }}
          >
            This phonebook is empty
          </p>
        )}
      </div>
    );
  }
}
