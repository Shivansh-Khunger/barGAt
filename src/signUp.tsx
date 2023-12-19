import clsx from "clsx";
import { produce } from "immer";
import { useEffect } from "react";
import { create } from "zustand";

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

  const mainDivClasses = clsx(
    " m-4  flex w-screen cursor-default items-center justify-center rounded-xl font-custom_mono transition-all duration-500 will-change-transform",

    // background
    { "gradient-background h-[82%]": transitionStates.transition },

    {
      "h-[92%] bg-gradient-to-br from-[#52a0ff]  to-[#e73c7e]":
        !transitionStates.transition,
    },
  );

  const blackLayerDivClasses = clsx(
    "absolute z-10 m-4 w-screen rounded-xl bg-black",
    { "h-[82%] opacity-0": transitionStates.transition },
    { "h-[92%] opacity-30": !transitionStates.transition },
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
        <div className={blackLayerDivClasses}></div>
        <div className={mainDivClasses}></div>
      </div>
    </>
  );
};

export default SignUp;
