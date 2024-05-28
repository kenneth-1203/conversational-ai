import { createClient } from "@/server/supabase/server";
import { ROUTES } from "@/client/types/enums";
import { redirect } from "next/navigation";
import { createCaller } from "@/server/routers/app.router";

interface Props {
  searchParams: {
    chatId: string;
  };
}

const Page = async ({ searchParams: { chatId } }: Props) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect(ROUTES.login)
    
    console.log(user)
  // TODO: get all required data
  // create caller for userDetails
  // create caller for userProjects
  // create caller for conversationsHistory
  // const selectedConversation = conversationsHistory?.find((con) => con.id === Number(chatId)) || null;

  return (
    // <Main
    //   userDetails={userDetails}
    //   userProjects={userProjects}
    //   conversationsHistory={conversationsHistory}
    //   selectedConversation={selectedConversation}
    // />
    <></>
  );
};

export default Page;
