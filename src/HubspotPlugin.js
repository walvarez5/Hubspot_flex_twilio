import { FlexPlugin } from '@twilio/flex-plugin';
import React from 'react';
import { Notifications, Actions } from '@twilio/flex-ui';

const PLUGIN_NAME = 'HubspotPlugin';

export default class HubspotPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    // Mantiene la lógica para abrir un contacto específico en HubSpot
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      if (task && task.attributes.crmid) {
        return `https://app.hubspot.com/contacts/47019330/record/0-1/${task.attributes.crmid}`;
      } else {
        return `https://jestor.com/wp-content/uploads/2021/11/hubspot.jpeg`; // Evita cargar la lista en el iframe
      }
    };

    // Agregar botón en la barra lateral para abrir HubSpot
    flex.SideNav.Content.add(
      <flex.SideLink
        key="hubspot-contacts"
        icon="Users"
        onClick={() => this.openHubSpotContacts()}
      >
        HubSpot
      </flex.SideLink>
    );
  }

  openHubSpotContacts() {
    const hubspotURL = 'https://app.hubspot.com/contacts/47019330/objects/0-1/views/all/list';
    window.open(hubspotURL, '_blank'); // Abre la lista de contactos en una nueva pestaña

    // Notifica al usuario que la lista se abrió
    Notifications.showNotification({
      id: 'hubspot-opened',
      type: 'info',
      content: 'Lista de contactos de HubSpot abierta en una nueva pestaña.',
    });
  }
}







