'use server';

import User from '@/model/user.model';
import { connectToDatabase } from '../moongose';

export async function getUserByID(params) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(`❌ ${error} ❌`);
    throw error;
  }
}
