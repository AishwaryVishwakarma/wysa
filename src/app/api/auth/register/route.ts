import {NextRequest, NextResponse} from 'next/server';
import {Query} from 'node-appwrite';

import {
  COLLECTION_ID,
  DATABASE_ID,
  ID,
  account,
  databases,
} from '../../../../../config/appWrite';

export async function POST(request: NextRequest) {
  const {name, email, password} = await request.json();

  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('email', email),
    ]);

    if (res.total > 0) {
      await account.createEmailPasswordSession(email, password);

      return NextResponse.json(
        {
          message: 'An account with this email already exists.',
        },
        {status: 400}
      );
    }

    await account.create(ID.unique(), email, password);

    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      name,
      email,
    });

    return NextResponse.json(
      {
        message: 'Account created successfully.',
      },
      {status: 201}
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          'An error occurred while creating the account. Please try again.',
        error: error?.message,
      },
      {
        status: 400,
      }
    );
  }
}
