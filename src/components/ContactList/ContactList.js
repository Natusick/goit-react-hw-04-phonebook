import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ContactInput from "../ContactInput/ContactInput";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Li key={id}>
          <ContactInput name={name} number={number} />
          <Button type="button" onClick={() => onDeleteContact(id)}>
            Delete
          </Button>
        </Li>
      ))}
    </List>
  );
};
const List = styled.ul`
  margin-left: 15px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  list-style: circle;
`;

const Button = styled.button`
  margin-left: 15px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid black;
  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    color: white;
    border: 4px solid transparent;
    background-color: rgb(32, 122, 174, 0.56);
    box-shadow: 1px 4px 6px 0px rgba(0, 0, 0, 0.16),
      0px 4px 4px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12);
  }
`;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
