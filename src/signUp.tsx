import clsx from "clsx";
import { produce } from "immer";
import { useEffect } from "react";
import { create } from "zustand";
import { GeneralDataForm } from "./components/signUp/from";

type transitionType = {
  transition: boolean;
  updateTransion: (updatedValue: boolean) => void;
};

const transitionStore = create<transitionType>((set) => ({
  transition: true,
  updateTransion: (updatedState: boolean) =>
    set(
      produce((state: transitionType) => {
        state.transition = updatedState;
      }),
    ),
}));

const SignUp = () => {
  const transitionStates = transitionStore();

  const bgDivClasses = clsx(
    " m-4 flex w-screen items-center justify-center rounded-xl font-sans transition-all duration-500 will-change-transform",

    // background
    { "gradient-background h-[89%] md:h-[82%]": transitionStates.transition },

    {
      "h-[92%] bg-gradient-to-br from-[#3a66a3] via-[#72408a] to-[#b8538d]":
        !transitionStates.transition,
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      transitionStates.updateTransion(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className={bgDivClasses}>
          <GeneralDataForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;
