import { nanoid } from "nanoid";
import * as fs from "node:fs/promises"

import path from "node:path"


const contactsPath = path.resolve("db", "contacts.json")
 
console.log(contactsPath)


async function readContacts() {
    // ...твій код. Повертає масив контактів.
const data = await fs.readFile(contactsPath, {encoding: "utf-8"})
.then((data) => JSON.parse(data))
.catch((err) => console.error(err));
console.table(data)
return data

  }
  
  async function writeContacts(contacts) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    await fs.writeFile(contactsPath, JSON.stringify(contacts , undefined, 2))
  }

  async function listContacts() {
    const contacts = await readContacts()
    return contacts
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
    const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  } 

  const deleteContact = contacts[index]
  contacts.splice(index, 1);

  await writeContacts(contacts)

 return deleteContact
 
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

  export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }