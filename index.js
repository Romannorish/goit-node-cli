import { program } from "commander"
import {listContacts,getContactById,addContact,removeContact} from './contacts.js'
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContact = await listContacts();
      console.table(listContact)
      break
    case "get":
      const getContactId = await getContactById(id);
      console.log(getContactId)
      break
    case "add":
      const addContact_ = await addContact(name,email,phone);
      console.log(addContact_)
      break

    case "remove":
    const deliteContact = await removeContact(id);
    console.log(deliteContact)
    break

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);