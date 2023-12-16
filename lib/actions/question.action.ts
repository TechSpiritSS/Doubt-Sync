'use server';

import { connectToDatabase } from '../moongose';

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
