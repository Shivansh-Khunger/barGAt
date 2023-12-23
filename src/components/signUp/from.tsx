import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";

export const GeneralDataForm = () => {
  const schema = z.object({
    userFullName: z.string().min(1, { message: "Required" }),
    userEmail: z.string().email(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const generalDataFormInputClasses = clsx(
    "w-52 border-2 transition-all duration-200 will-change-transform hover:-translate-y-[2.5px] focus:translate-y-0 focus:shadow-[0px_0px_10px_0px_white]",
  );

  const generalDataFromInputLabelClasses = clsx("text-lg");

  const buttonClasses = clsx(
    // general
    "group flex w-min items-center justify-center bg-black p-5 text-xl transition-all ease-in-out",

    //hover
    {
      "hover:-translate-y-[3px] hover:bg-white hover:shadow-[0px_4.5px_0px_0px_black] hover:duration-200":
        true,
    },

    // active
    {
      "active:-translate-y-[3px] active:bg-black active:shadow-[0px_4.5px_0px_0px_white]":
        true,
    },

    // landing animation
    {
      "animate-fade-up animate-duration-[550ms] animate-ease-linear": false,
    },
  );

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex w-64 flex-col items-center space-y-4 rounded-xl bg-black p-6 text-3xl text-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="underline underline-offset-[5px]"> Sign Up</div>
          <FormField
            control={form.control}
            name="userFullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={generalDataFromInputLabelClasses}>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg -> Shivansh Khunger"
                    {...field}
                    className={generalDataFormInputClasses}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={generalDataFromInputLabelClasses}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg -> xyz@xyz.com"
                    {...field}
                    className={generalDataFormInputClasses}
                  />
                </FormControl>
                <FormDescription className="ml-2 text-sm text-slate-300">
                  we will not spam you !
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className={buttonClasses}>
            {" "}
            <div className="ml-2 scale-125">
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
        </form>
      </Form>
    </>
  );
};
