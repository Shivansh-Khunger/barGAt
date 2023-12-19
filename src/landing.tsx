import { Button } from "./components/ui/button";
import { produce } from "immer";
import { create } from "zustand";
import clsx from "clsx";
import { useEffect } from "react";
import useLocation from "wouter/use-location";

type landingAnimationType = {
  landingAnimation: {
    board: boolean;
    boardText: boolean;
    buttonText: boolean;
    button: boolean;
  };
};

type landingAnimationUpdateType = {
  updateBoardLandingAnimation: (updatedState: boolean) => void;
  updateBoardTextLandingAnimaton: (updatedState: boolean) => void;
  updateButtonTextLandingAnimation: (updatedState: boolean) => void;
  updateButtonLandingAnimation: (updatedState: boolean) => void;
};

const landingAnimationStore = create<
  landingAnimationType & landingAnimationUpdateType
>((set) => ({
  landingAnimation: {
    board: true,
    boardText: true,
    buttonText: true,
    button: true,
  },

  updateBoardLandingAnimation: (updatedState: boolean) =>
    set(
      produce((state: landingAnimationType) => {
        state.landingAnimation.board = updatedState;
      }),
    ),

  updateBoardTextLandingAnimaton: (updatedState: boolean) =>
    set(
      produce((state: landingAnimationType) => {
        state.landingAnimation.boardText = updatedState;
      }),
    ),

  updateButtonTextLandingAnimation: (updatedState: boolean) =>
    set(
      produce((state: landingAnimationType) => {
        state.landingAnimation.buttonText = updatedState;
      }),
    ),

  updateButtonLandingAnimation: (updatedState: boolean) =>
    set(
      produce((state: landingAnimationType) => {
        state.landingAnimation.button = updatedState;
      }),
    ),
}));

const Landing = () => {
  const landinAnimationStates = landingAnimationStore();
  const [locationState, setLocation] = useLocation();

  const mainDivClasses = clsx(
    "gradient-background m-4 flex h-[82%] w-screen cursor-default items-center justify-center rounded-xl font-custom_mono transition-all duration-500 will-change-transform",
  );

  const boardClasses = clsx(
    "flex items-center justify-center rounded-3xl bg-black p-4 text-7xl text-white transition-all ease-linear will-change-transform dark:bg-transparent dark:text-black",

    // landing animation
    {
      "duration-300 animate-in slide-in-from-top":
        landinAnimationStates.landingAnimation.board,
    },
    {
      "rotate-3": !landinAnimationStates.landingAnimation.board,
    },

    // hover
    {
      "hover:bg-white hover:text-black":
        !landinAnimationStates.landingAnimation.board,
    },
  );

  const boardTextClasses = clsx(
    // general
    "p-4 text-3xl",

    // landing animation
    {
      "animate-fade-left animate-duration-[400ms] animate-ease-in":
        landinAnimationStates.landingAnimation.boardText,
    },
  );

  const buttonTextClasses = clsx(
    // general
    "my-4 gap-2 text-3xl",

    // landing animation
    {
      "animate-fade animate-alternate animate-duration-[550ms] animate-ease-in":
        landinAnimationStates.landingAnimation.buttonText,
    },
  );

  const buttonClasses = clsx(
    // general
    "group flex w-min items-center justify-center bg-black p-5 text-4xl transition-all ease-in-out",

    //hover
    {
      "hover:-translate-y-[3px] hover:bg-white hover:shadow-[0px_4.5px_0px_0px_black] hover:duration-200":
        !landinAnimationStates.landingAnimation.button,
    },

    // active
    {
      "active:-translate-y-[3px] active:bg-black active:shadow-[0px_4.5px_0px_0px_white]":
        !landinAnimationStates.landingAnimation.button,
    },

    // landing animation
    {
      "animate-fade-up animate-duration-[550ms] animate-ease-linear":
        landinAnimationStates.landingAnimation.button,
    },
  );

  const handleButtonClick = () => {
    const timer = setTimeout(() => {
      setLocation("/sign-up");
    }, 201);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      landinAnimationStates.updateBoardLandingAnimation(false);
      landinAnimationStates.updateBoardTextLandingAnimaton(false);
      landinAnimationStates.updateButtonLandingAnimation(false);
      landinAnimationStates.updateButtonTextLandingAnimation(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className={mainDivClasses}>
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="flex">
              <div className={boardClasses}>this is barGAt</div>
              <div className={boardTextClasses}>
                just another <br />
                social media app <br /> to show off your life.{" "}
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center ">
              <div className={buttonTextClasses}>
                let's get you on board shall we ?
              </div>
              <Button className={buttonClasses} onClick={handleButtonClick}>
                {" "}
                <div className="ml-2 scale-150">
                  <svg
                    className="stroke-white stroke-2 group-hover:stroke-black group-active:stroke-white"
                    fill="none"
                    width="18"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path
                      className="opacity-0 transition duration-300 group-hover:-translate-x-[3.2px] group-hover:opacity-100"
                      d="M0 5h7"
                    ></path>
                    <path
                      className="transition duration-200 group-hover:translate-x-[7.2px]"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
