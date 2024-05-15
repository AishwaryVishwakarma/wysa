import {Account, Client, Databases} from 'appwrite';

export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('664371a9000b20a1a352');

export const account = new Account(client);

export const databases = new Databases(client);

export {ID} from 'appwrite';

// Database
export const DATABASE_ID = '664394d6002816be3c81';
export const COLLECTION_ID = '664394e10000b85cc77f';
