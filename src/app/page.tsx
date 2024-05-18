import LogoutButton from "@/client/components/logout-button";
import { Search } from "@/client/components/search";

const Page = async () => {
  return (
    <div className="flex flex-col mx-auto justify-center h-screen max-w-4xl">
      <LogoutButton />
      <div className="border rounded-lg p-3 shadow-md">
        <h1 className="relative text-center font-semibold text-lg pb-3">
          Conversational AI
          <span className="absolute bottom-0 left-0 h-[1px] w-full bg-border" />
        </h1>
        <div className="flex flex-col gap-3 relative h-[50rem] w-full overflow-hidden">
          <div className="relative flex flex-grow h-1 flex-col overflow-y-auto"></div>
          <div className="flex flex-col">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
