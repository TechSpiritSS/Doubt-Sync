import Question from '@/components/forms/Question';
import { getUserByID } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoDbUser = await getUserByID({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoDbUserId={JSON.stringify(mongoDbUser?._id)} />
      </div>
    </div>
  );
};

export default Page;
