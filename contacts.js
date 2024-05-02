import { nanoid } from "nanoid";
import * as fs from "node:fs/promises"

import path from "node:path"


const contactsPath = path.resolve("db", "contacts.json")
 
console.log(contactsPath)



async function listContacts() {
    // ...твій код. Повертає масив контактів.
const data = await fs.readFile(contactsPath, {encoding: "utf-8"})
.then((data) => JSON.parse(data))
.catch((err) => console.error(err));
console.log(data)
return data

  }
  listContacts()
  async function writeContacts(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    await fs.writeFile(contactsPath, JSON.stringify(contactId , undefined, 2))
  }
  
 async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts()

    const contact = contacts.find(contact => contact.id === contactId)

    if(typeof contact === 'undefined') {
      return null
    }
    return contact
  }


  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  }
  
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts()

    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
        
    }

    contacts.push(newContact)

    await writeContacts(contacts)

    return newContact
  }


  export default {
    listContacts,
    writeContacts,
    getContactById,
    removeContact,
    addContact,
  }