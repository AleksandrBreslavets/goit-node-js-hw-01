const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
};

const getContactById = async contactId => {
    const contacts = await listContacts();
    const searchedContact = contacts.find(item => item.id === contactId);
    return searchedContact || null;
};

const removeContact = async contactId => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) return null;
    const [deletedContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
}

const addContact = async data => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}







