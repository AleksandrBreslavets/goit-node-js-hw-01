const { Command } = require('commander');
const program = new Command();
const contactsOperations = require("./contacts");

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');
  
program.parse(process.argv);

const argv = program.opts();

const invokeAction=async ({ action, id, name, email, phone })=> {
  switch (action) {
    case 'list':
        const allContacts = await contactsOperations.listContacts();
        console.table(allContacts);
        break;

    case 'get':
        const searchedBook = await contactsOperations.getContactById(id);
        if(!searchedBook){
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log(searchedBook);
        break;

    case 'add':
        const newContact = await contactsOperations.addContact({ name, email, phone });
        console.log(newContact);
        break;

    case 'remove':
        const deletedContact = await contactsOperations.removeContact(id);
        console.log(deletedContact);
        break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);