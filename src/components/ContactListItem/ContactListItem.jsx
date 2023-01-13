import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { BsFillCircleFill } from 'react-icons/bs';

const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.listItem}>
      <div>
        <span className={css.icon}>
          <BsFillCircleFill
            style={{
              height: '20px',
              width: '20px',
            }}
          />
        </span>
        {name}: {number}
      </div>
      <button
        type="button"
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
