import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './Filter/Filter.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handlerChangeFilter = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const formHandlerSubmit = data => {
    const array = contacts.filter(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (array.length > 0) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(prevState => [data, ...prevState]);
    }
  };

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
      <ContactForm onSubmit={formHandlerSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handlerChangeFilter} />
      {contacts.length > 0 ? (
        <ContactList
          filteredContacts={filterContacts()}
          deleteContact={deleteContact}
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
};
