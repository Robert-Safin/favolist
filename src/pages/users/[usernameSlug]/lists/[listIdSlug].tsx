import { connectDB } from "@/db/lib/connectDb";
import List, { ListModelSchema } from "@/db/models/List";
import User from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

interface Props {
  list: ListModelSchema
}

const ShowList: NextPage<Props> = (props) => {

  const { data: session, status } = useSession()

  if (!session) {
    // to do
    return <p>no session</p>
  }



  return (

    <>
      <div>
        <h1>PRODUCTS</h1>
        <h1>ABOUT</h1>
        <h1>REFERRALS</h1>
      </div>

      <p>{props.list.title}</p>
      <p>{props.list.about}</p>
      <p>{props.list.thumbnail}</p>
      <p>{props.list.products.length} products in the list</p>
    </>
  )
}

export default ShowList


export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const session = await getSession(context);
  const userEmail = session?.user?.email;
  const userDoc = await User.findOne({ email: userEmail });
  const userId = userDoc?._id
  const listDoc = await List.findOne({ user_id: userId })

  const usernameSlug = context.params!.usernameSlug
  const listSlug = context.params!.listIdSlug



  const list = await List.findOne({ title: listSlug })

  if (!listDoc) {
    // to do
    return {
      notFound: true,
    };
  }


  return {
    props: {
      list: JSON.parse(JSON.stringify(list)),
    },
  };
};
