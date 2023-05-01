import { GetServerSideProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { connectDB } from "@/db/lib/connectDb";
import User from "@/db/models/User";
import List from "@/db/models/List";
import { ListModelSchema } from "@/db/models/List";

interface ListProps {
  lists: ListModelSchema[],
}


const UserLists: NextPage<ListProps> = (props) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (!session) {
    // to do
  }


  return (
    <>
      <h1>User lists</h1>

      {props.lists.map(list => <div key={String(list._id)}>{list.title}</div>)}



    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  const userDoc = await User.findOne({ email: userEmail });
  const userId = userDoc?._id
  const listDoc = await List.find({ user_id: userId })

  if (!userDoc) {
    // to do
    return {
      notFound: true,
    };
  }

  const parsedLists = JSON.parse(JSON.stringify(listDoc))




  return {
    props: {
      lists: parsedLists,
    },
  };
};





export default UserLists
