import { connectDB } from "@/db/lib/connectDb";
import List, { ListModelSchema } from "@/db/models/List";
import User from "@/db/models/User";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
interface Props {
  list: ListModelSchema
}

const ShowList: NextPage<Props> = (props) => {

  const { data: session, status } = useSession()
  const router = useRouter()
  const usernameSlug = router.query.usernameSlug
  const listIdSlug = router.query.listIdSlug

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  }

const handleClick = () => {
  router.push(`/users/${usernameSlug}/lists/${listIdSlug}/new-product`)
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

      <button onClick={handleClick}>add product to list</button>
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