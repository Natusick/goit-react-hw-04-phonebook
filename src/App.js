import React, {  useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import styled from "styled-components";

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');
  const isRender = useRef(true);


  useEffect(() => {
    if (isRender.current) {
      isRender.current = false;
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const getContacts = contacts.find(({ name }) => name === contact.name);

     if(getContacts)
      return alert(`${name} is already in contacts.`); 
    
      setContacts([contact, ...contacts]);  
  };

  const visibleContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value );
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId)
    )};

    return (
      <Wrapper>
        <h1> Phonebook </h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Wrapper>
    );
  }



const Wrapper = styled.main`
  display: block;
  margin-left: 15px;
  width: 500px;
`;

export default App;
