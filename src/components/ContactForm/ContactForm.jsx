import { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumder] = useState('');

  const reset = () => {
    setName('');
    setNumder('');
  };

  const handlerChangeName = event => {
    setName(event.target.value);
  };

  const handlerChangeNumber = event => {
    setNumder(event.target.value);
  };

  const handlerSubmit = event => {
    event.preventDefault();
    const contact = { name, number, id: uuidv4() };
    onSubmit(contact);
    reset();
  };

  return (
    <form
      className={`${css.contactForm} ${css.block}`}
      onSubmit={handlerSubmit}
    >
      <label className={css.block}>
        Name
        <input
          className={css.block}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handlerChangeName}
        />
      </label>

      <label className={css.block}>
        Number
        <input
          className={css.block}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handlerChangeNumber}
        />
      </label>
      <button type="Submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
