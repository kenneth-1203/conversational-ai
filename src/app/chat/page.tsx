import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="min-w-[200px] h-full border-r">Sidebar</div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col-reverse flex-grow h-1">Chat</div>
        <div className="min-h-[200px] border-t">Search</div>
      </div>
    </div>
  );
};

export default Page;
