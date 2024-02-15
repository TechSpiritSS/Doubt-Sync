import QuestionCard from '@/components/card/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import { getQuestions } from '@/lib/actions/question.action';
import Link from 'next/link';

// const questions = [
//   {
//     _id: '1',
//     title: 'How to create a React component?',
//     tags: [
//       { _id: 'tag1', name: 'React' },
//       { _id: 'tag2', name: 'JavaScript' },
//     ],
//     author: {
//       _id: 'author1',
//       name: 'John Doe',
//       picture: 'john-doe.jpg',
//     },
//     upvotes: 10,
//     views: 150,
//     answers: [
//       {
//         answerId: 'answer1',
//         text: 'You can create a React component by using the "class" or "function" component syntax.',
//         author: {
//           _id: 'author2',
//           name: 'Jane Smith',
//           picture: 'jane-smith.jpg',
//         },
//         createdAt: new Date('2023-10-30'),
//       },
//     ],
//     createdAt: new Date('2023-10-28'),
//   },
//   {
//     _id: '2',
//     title: 'What is JavaScript closure?',
//     tags: [
//       { _id: 'tag3', name: 'JavaScript' },
//       { _id: 'tag4', name: 'Closures' },
//     ],
//     author: {
//       _id: 'author3',
//       name: 'Alice Johnson',
//       picture: 'alice-johnson.jpg',
//     },
//     upvotes: 8,
//     views: 100,
//     answers: [],
//     createdAt: new Date('2023-10-29'),
//   },
// ];

const Home = async () => {
  const result = await getQuestions({});
  const questions = result.questions;

  console.log(result.questions);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"> All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imageSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResult
            title="No Questions Found"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your Query could be the next big thing others learn from.
          Get Involved! 💡"
            link="/ask-question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
