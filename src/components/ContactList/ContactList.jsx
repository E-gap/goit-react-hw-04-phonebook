import React from 'react';
import ContactListItem from '../ContactListItem/ContactListItem.jsx';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filteredContacts, deleteContact }) => {
  return filteredContacts.length > 0 ? (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  ) : (
    <p className={css.warning}>There are not such contacts in this phonebook</p>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
