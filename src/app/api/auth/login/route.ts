import {NextRequest, NextResponse} from 'next/server';

import {ID, account} from '../../../../../config/appWrite';

export async function POST(request: NextRequest) {
  const {email, password, rememberMe} = await request.json();

  try {
    const res = await account.create(ID.unique(), email, password);

    return NextResponse.json(res, {status: 201});
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
