'use server';

import Question from '@/model/question.model';
import Tag from '@/model/tag.model';
import User from '@/model/user.model';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../moongose';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: 'tags',
        model: Tag,
      })
      .populate({
        path: 'author',
        model: User,
      })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, 'i'),
          },
        },
        {
          $setOnInsert: {
            name: tag,
            $push: {
              questions: question._id,
            },
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments.map((tag) => tag._id),
        },
      },
    });

    // Reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
