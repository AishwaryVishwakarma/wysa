import {Account, Client} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('664371a9000b20a1a352');

export const account = new Account(client);
export {ID} from 'appwrite';
