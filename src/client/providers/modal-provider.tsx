"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { useSurveyModal } from "../components/modal/survey-modal";

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalContextProps = {
  setShowSurveyModal: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const { SurveyModal, setShowSurveyModal } = useSurveyModal();

  return (
    <ModalContext.Provider value={{ setShowSurveyModal }}>
      <SurveyModal />
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be within a ModalContextProvider");
  }
  return context;
}
