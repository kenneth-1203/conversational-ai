"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimationProps } from "@/client/utils/animations";
import ScrollableContainer from "./scrollable-container";
import Message from "./message";

interface Props {
  isAsking: boolean;
  conversation: any;
  userDetails: any;
}

const UserConversation = ({ isAsking, conversation, userDetails }: Props) => {
  const conversationList = conversation.conversation_list || [];
  return (
    <ScrollableContainer>
      <div className="flex flex-col">
        <AnimatePresence>
          {conversationList.map((chat, index) => (
            <motion.div {...fadeAnimationProps} key={chat.id}>
              <Message
                chat={chat}
                topicId={conversation.topic_id}
                userDetails={userDetails}
                isAsking={isAsking}
                isLastMessage={index === conversationList.length - 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollableContainer>
  );
};

export default UserConversation;
