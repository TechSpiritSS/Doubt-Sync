'use server';

import Question from '@/model/question.model';
import User from '@/model/user.model';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../moongose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from './shared.types';

export async function getUserByID(params: GetUserByIdParams) {
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

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(params);

    return newUser;
  } catch (error) {
    console.error(`❌ ${error} ❌`);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, path, updateData } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error(`❌ ${error} ❌`);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    // delete user from all questions and answers, etc.

    // eslint-disable-next-line no-unused-vars
    const userQuestions = await Question.find({
      'author._id': user._id,
    }).distinct('_id');

    await Question.deleteMany({ 'author._id': user._id });

    // TODO: delete user from answers

    const deletedUser = await User.findOneAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(`❌ ${error} ❌`);
    throw error;
  }
}
