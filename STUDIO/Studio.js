{
    "description": "Messaging flow",
    "states": [
      {
        "name": "Trigger",
        "type": "trigger",
        "transitions": [
          {
            "event": "incomingMessage"
          },
          {
            "event": "incomingCall"
          },
          {
            "next": "elimina",
            "event": "incomingConversationMessage"
          },
          {
            "event": "incomingRequest"
          },
          {
            "event": "incomingParent"
          }
        ],
        "properties": {
          "offset": {
            "x": -320,
            "y": -360
          }
        }
      },
      {
        "name": "Fetch_CRM_ID",
        "type": "run-function",
        "transitions": [
          {
            "next": "SendGreeting",
            "event": "success"
          },
          {
            "next": "Flex-NoID",
            "event": "fail"
          }
        ],
        "properties": {
          "service_sid": "ZSe0992be2563978d48e32a2ab17af4b38",
          "environment_sid": "ZEa94ef02e1c8a3d86ab450ba198cd2f26",
          "offset": {
            "x": -50,
            "y": 230
          },
          "function_sid": "ZHcf3c65607531db1b0d23cc0223f9e277",
          "parameters": [
            {
              "value": "{{widgets.elimina.body}}",
              "key": "numero"
            }
          ],
          "url": "https://getcontacthubspot-1498.twil.io/ContactbyNumber"
        }
      },
      {
        "name": "SendConversationToAgent",
        "type": "send-to-flex",
        "transitions": [
          {
            "event": "callComplete"
          },
          {
            "event": "failedToEnqueue"
          },
          {
            "event": "callFailure"
          }
        ],
        "properties": {
          "offset": {
            "x": -690,
            "y": 790
          },
          "workflow": "WW07ba854a9cba83e051695bcb70feeee2",
          "channel": "TC29dd64a16dbebd23e5888499d9fc7508",
          "attributes": "{ \"type\": \"inbound\", \"name\": \"{{widgets.Fetch_CRM_ID.parsed.contacts[0].properties.firstname.value}}\", \"crmid\":\"{{widgets.Fetch_CRM_ID.parsed.contacts[0].vid}}\"}"
        }
      },
      {
        "name": "Flex-NoID",
        "type": "send-to-flex",
        "transitions": [
          {
            "event": "callComplete"
          },
          {
            "event": "failedToEnqueue"
          },
          {
            "event": "callFailure"
          }
        ],
        "properties": {
          "offset": {
            "x": 70,
            "y": 510
          },
          "workflow": "WW07ba854a9cba83e051695bcb70feeee2",
          "channel": "TC29dd64a16dbebd23e5888499d9fc7508"
        }
      },
      {
        "name": "SendGreeting",
        "type": "send-message",
        "transitions": [
          {
            "next": "SendConversationToAgent",
            "event": "sent"
          },
          {
            "next": "SendConversationToAgent",
            "event": "failed"
          }
        ],
        "properties": {
          "offset": {
            "x": -390,
            "y": 520
          },
          "service": "{{trigger.message.InstanceSid}}",
          "channel": "{{trigger.message.ChannelSid}}",
          "from": "{{flow.channel.address}}",
          "to": "{{contact.channel.address}}",
          "body": "Hola  {{widgets.Fetch_CRM_ID.parsed.contacts[0].properties.firstname.value}}\n\nUno de nuestros agentes estara en contacto contigo proximamente."
        }
      },
      {
        "name": "elimina",
        "type": "run-function",
        "transitions": [
          {
            "next": "Fetch_CRM_ID",
            "event": "success"
          },
          {
            "next": "Fetch_CRM_ID",
            "event": "fail"
          }
        ],
        "properties": {
          "service_sid": "ZS4d398704a956867bbf050e68580569a2",
          "environment_sid": "ZE85366c4ed69795bf8d3cbb6ce8dc92f2",
          "offset": {
            "x": -80,
            "y": -80
          },
          "function_sid": "ZHa55697e299abad5a05757f9ba25d1bf6",
          "parameters": [
            {
              "value": "{{contact.channel.address}}",
              "key": "entrada"
            }
          ],
          "url": "https://eliminarcaracteres-4423.twil.io/eliminar_caracter"
        }
      }
    ],
    "initial_state": "Trigger",
    "flags": {
      "allow_concurrent_calls": true
    }
  }