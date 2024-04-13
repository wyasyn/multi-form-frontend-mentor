"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import arcade from "@/public/assets/images/icon-arcade.svg";
import advanced from "@/public/assets/images/icon-advanced.svg";
import pro from "@/public/assets/images/icon-pro.svg";
import thankYou from "@/public/assets/images/icon-thank-you.svg";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required",
    }),
    email: z.string().email(),
    phone: z.string().min(10, {
        message: "Phone number must be 10 characters",
    }),
    plan: z.string(),
    service: z.boolean().default(false).optional(),
    storage: z.boolean().default(false).optional(),
    profile: z.boolean().default(false).optional(),
});

const plan = [
    {
        name: "Arcade",
        price: {
            monthly: "9",
            yearly: "90",
        },
        image: arcade,
    },
    {
        name: "Advanced",
        price: {
            monthly: "12",
            yearly: "120",
        },
        image: advanced,
    },
    {
        name: "Pro",
        price: {
            monthly: "15",
            yearly: "150",
        },
        image: pro,
    },
];

const steps = [
    {
        step: 1,
        name: "Your info",
        fields: ["name", "email", "phone"],
    },
    {
        step: 2,
        name: "select plan",
        fields: ["plan"],
    },
    {
        step: 3,
        name: "add-ons",
        fields: ["service", "storage", "profile"],
    },
    {
        step: 4,
        name: "summary",
    },
];

export default function MainForm() {
    const [monthly, setMonthly] = useState(true);
    const [prevStep, setPrevStep] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);

    const delta = currentStep - prevStep;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plan: "0",
            service: false,
            storage: false,
            profile: false,
        },
    });

    type FieldName = keyof z.infer<typeof formSchema>;

    const next = async () => {
        const fields = steps[currentStep].fields;

        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true,
        });

        if (!output) return;

        if (currentStep < steps.length) {
            setPrevStep(currentStep);
            setCurrentStep((step) => step + 1);
        }
    };

    const previous = () => {
        if (currentStep > 0) {
            setPrevStep(currentStep);
            setCurrentStep((step) => step - 1);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setCurrentStep(steps.length + 1);
    }

    return (
        <section className=" lg:grid lg:grid-cols-3 lg:items-center lg:justify-center lg:bg-secondary lg:rounded-lg lg:p-4 ">
            <div className="col-span-1 side-bar lg:h-full lg:min-w-[300px] min-h-[300px] pt-8 lg:pt-0 lg:rounded-lg">
                <ul className=" flex  items-start justify-center gap-x-8 lg:flex-col lg:gap-y-8 py-8 px-6 lg:justify-start ">
                    {steps.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className=" cursor-pointer "
                                onClick={() => {
                                    setCurrentStep(item.step);
                                }}
                            >
                                <div className=" flex items-center justify-start group gap-4">
                                    <div
                                        className={`flex items-center justify-center group-hover:bg-background rounded-full group-hover:text-primary p-2 border border-background w-10 h-10  font-semibold ${
                                            currentStep >= item.step
                                                ? " bg-background text-primary "
                                                : "text-secondary"
                                        } `}
                                    >
                                        {item.step}
                                    </div>
                                    <div className="hidden lg:block uppercase text-sm">
                                        <h3 className=" text-background ">
                                            step {item.step}
                                        </h3>
                                        <p className=" text-secondary font-semibold ">
                                            {item.name}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="col-span-2 bg-secondary px-8 py-14 rounded-lg mx-4 mt-[-5rem] mb-[3rem] lg:mb-auto lg:mt-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex flex-col"
                    >
                        {currentStep === 1 && (
                            <motion.div
                                initial={{
                                    x: delta >= 0 ? "50%" : "-50%",
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                    Personal info
                                </h3>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-balance ">
                                    Please provide your name, email address and
                                    phone number
                                </p>

                                <div className=" flex flex-col gap-3 my-[3rem] ">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-primary font-semibold ">
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="eg. Yasin Walum"
                                                        {...field}
                                                        {...form.register(
                                                            "name"
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-primary font-semibold ">
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="eg. meekmill@gmail.com"
                                                        {...field}
                                                        {...form.register(
                                                            "email"
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" text-primary font-semibold ">
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="eg. +256 785 451 455"
                                                        {...field}
                                                        {...form.register(
                                                            "phone"
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                initial={{
                                    x: delta >= 0 ? "50%" : "-50%",
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                    Select your plan
                                </h3>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-balance ">
                                    You have the option of monthly or yearly
                                    billing.
                                </p>
                                <div>
                                    <div className=" flex items-center justify-center my-[3rem] ">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="plan"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                className="flex gap-4 flex-wrap justify-center"
                                                            >
                                                                {plan.map(
                                                                    (item) => (
                                                                        <FormItem
                                                                            className="flex items-center space-x-3 space-y-0 "
                                                                            key={
                                                                                item.name
                                                                            }
                                                                        >
                                                                            <FormControl>
                                                                                <RadioGroupItem
                                                                                    value={
                                                                                        monthly
                                                                                            ? item
                                                                                                  .price
                                                                                                  .monthly
                                                                                            : item
                                                                                                  .price
                                                                                                  .yearly
                                                                                    }
                                                                                    className=" sr-only "
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="font-normal">
                                                                                <div className=" hover:bg-background transition-all border border-border/50  rounded-md p-4 flex flex-col gap-10 min-w-[130px] cursor-pointer shadow-sm">
                                                                                    <div>
                                                                                        <Image
                                                                                            src={
                                                                                                item.image
                                                                                            }
                                                                                            alt={
                                                                                                item.name
                                                                                            }
                                                                                            width={
                                                                                                32
                                                                                            }
                                                                                            height={
                                                                                                32
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div className=" flex flex-col gap-2 ">
                                                                                        <h3 className=" font-semibold ">
                                                                                            {
                                                                                                item.name
                                                                                            }
                                                                                        </h3>
                                                                                        <p>
                                                                                            $
                                                                                            {monthly
                                                                                                ? item
                                                                                                      .price
                                                                                                      .monthly +
                                                                                                  "/mo"
                                                                                                : item
                                                                                                      .price
                                                                                                      .yearly +
                                                                                                  "/yr"}
                                                                                        </p>
                                                                                        {!monthly && (
                                                                                            <h4 className=" font-medium text-sm ">
                                                                                                2
                                                                                                months
                                                                                                free
                                                                                            </h4>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
                                                                )}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="my-12 flex items-center justify-center gap-8 ">
                                            <p
                                                className={`${
                                                    monthly &&
                                                    "text-primary font-semibold transition-all"
                                                }`}
                                            >
                                                Monthly
                                            </p>
                                            <div
                                                className={` cursor-pointer flex items-center p-1 rounded-3xl h-6 w-[50px] bg-primary transition-all ${
                                                    !monthly
                                                        ? "justify-end"
                                                        : "justify-start"
                                                } `}
                                                onClick={() => {
                                                    setMonthly(!monthly);
                                                }}
                                            >
                                                <div className=" w-4 h-4 bg-secondary rounded-full ">
                                                    <span className=" sr-only ">
                                                        toggle
                                                    </span>
                                                </div>
                                            </div>
                                            <p
                                                className={`${
                                                    !monthly &&
                                                    "text-primary font-semibold transition-all"
                                                }`}
                                            >
                                                Yearly
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{
                                    x: delta >= 0 ? "50%" : "-50%",
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                    Pick add - ons
                                </h3>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-balance ">
                                    Add-ons help enhance your gaming experience.
                                </p>
                                <div className=" flex flex-col gap-3 my-[3rem] ">
                                    <FormField
                                        control={form.control}
                                        name="service"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none flex-1">
                                                    <FormLabel>
                                                        <div className=" flex items-center justify-between gap-4 ">
                                                            <div>
                                                                <h3 className=" mb-2  font-semibold ">
                                                                    Online
                                                                    Services
                                                                </h3>
                                                                <p>
                                                                    Access to
                                                                    multiplayer
                                                                    games.
                                                                </p>
                                                            </div>
                                                            <div className=" text-ring font-semibold">
                                                                +$
                                                                {`${
                                                                    monthly
                                                                        ? "1/mo"
                                                                        : "10/yr"
                                                                }`}
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="storage"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none flex-1">
                                                    <FormLabel>
                                                        <div className=" flex items-center justify-between gap-4 ">
                                                            <div>
                                                                <h3 className=" mb-2  font-semibold ">
                                                                    Larger
                                                                    storage
                                                                </h3>
                                                                <p>
                                                                    Extra 1TB of
                                                                    cloud save
                                                                </p>
                                                            </div>
                                                            <div className=" text-ring font-semibold">
                                                                +$
                                                                {`${
                                                                    monthly
                                                                        ? "2/mo"
                                                                        : "20/yr"
                                                                }`}
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="profile"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none flex-1">
                                                    <FormLabel>
                                                        <div className=" flex items-center justify-between gap-4 ">
                                                            <div>
                                                                <h3 className=" mb-2  font-semibold ">
                                                                    Customizable
                                                                    profile
                                                                </h3>
                                                                <p>
                                                                    Custom theme
                                                                    on your
                                                                    profile
                                                                </p>
                                                            </div>
                                                            <div className=" text-ring font-semibold">
                                                                +$
                                                                {`${
                                                                    monthly
                                                                        ? "2/mo"
                                                                        : "20/yr"
                                                                }`}
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )}
                        {currentStep === 4 && (
                            <motion.div
                                initial={{
                                    x: delta >= 0 ? "50%" : "-50%",
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                    Finishing up
                                </h3>
                                <p className="leading-7 [&:not(:first-child)]:mt-6 text-balance ">
                                    Double-check everything looks OK before
                                    confirming
                                </p>
                                <div className=" flex flex-col gap-8 my-[3rem] ">
                                    <div className=" flex items-center justify-between ">
                                        <div>
                                            <h3>
                                                Arcade (
                                                {monthly ? "Monthly" : "Yearly"}
                                                )
                                            </h3>
                                            <small
                                                className=" border-b cursor-pointer "
                                                onClick={() => {
                                                    setCurrentStep(2);
                                                }}
                                            >
                                                Change
                                            </small>
                                        </div>
                                        <div className=" text-primary font-semibold ">
                                            ${monthly ? "9/mo" : "90/yr"}
                                        </div>
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div>
                                            <small>Online service</small>
                                        </div>
                                        <div className=" text-primary ">
                                            ${monthly ? "+1/mo" : "+10/yr"}
                                        </div>
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div>
                                            <small>Large storage</small>
                                        </div>
                                        <div className=" text-primary ">
                                            ${monthly ? "+2/mo" : "+20/yr"}
                                        </div>
                                    </div>
                                    <div className=" flex items-center justify-between ">
                                        <div>
                                            <small>
                                                Total{" "}
                                                {monthly
                                                    ? "(per month)"
                                                    : "(per year)"}{" "}
                                            </small>
                                        </div>
                                        <div className=" text-primary font-bold ">
                                            {monthly ? "12/mo" : "120/yr"}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentStep === 5 && (
                            <motion.div
                                initial={{
                                    x: delta >= 0 ? "50%" : "-50%",
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                className=" flex items-center justify-center flex-col gap-8 py-[7rem] "
                            >
                                <Image
                                    src={thankYou}
                                    alt="thank you"
                                    width={80}
                                    height={80}
                                />
                                <h2 className=" text-3xl md:text-5xl font-semibold ">
                                    Thank you!
                                </h2>
                                <p className=" max-w-[50ch] text-center text-wrap ">
                                    Thanks for confirming your subscription! We
                                    hope you have fun using our platform. If you
                                    ever need support, please feel free to email
                                    us at support@loremgaming.com.
                                </p>
                            </motion.div>
                        )}

                        {currentStep != steps.length + 1 && (
                            <div className=" flex items-center justify-between ">
                                {currentStep != 1 && (
                                    <Button
                                        className=" bg-secondary text-border "
                                        onClick={previous}
                                        type="button"
                                    >
                                        Go Back
                                    </Button>
                                )}
                                {currentStep! < steps.length && (
                                    <Button
                                        className=" ml-auto "
                                        type="button"
                                        onClick={next}
                                    >
                                        Next
                                    </Button>
                                )}

                                {currentStep == steps.length && (
                                    <Button
                                        className=" bg-ring w-fit self-end "
                                        type="submit"
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        </section>
    );
}
