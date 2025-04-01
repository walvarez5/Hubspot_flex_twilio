import React, { useState, useEffect } from 'react';
import { Table } from '@twilio/flex-ui';

const HUBSPOT_API_KEY = 'Bearer pat-na1-fa4c8b11-4fb0-4925-8661-13ce1b8b108a'; // ⚠️ Reemplaza con tu API Key de HubSpot

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${HUBSPOT_API_KEY}`);
        const data = await response.json();
        setContacts(data.results || []);
      } catch (error) {
        console.error("Error obteniendo contactos de HubSpot:", error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Contactos</h2>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.properties.firstname} {contact.properties.lastname}</td>
              <td>{contact.properties.email}</td>
              <td>{contact.properties.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ContactList;
