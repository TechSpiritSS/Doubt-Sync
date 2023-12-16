'use server';

import Question from '@/model/question.model';
import Tag from '@/model/tag.model';
import { connectToDatabase } from '../moongose';

export async function createQuestion(params: any) {
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
  } catch (error) {
    console.error(error);
  }
}
