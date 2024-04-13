import Link from "next/link";
import React from "react";

const aside = [
    {
        step: 1,
        title: "Your info",
        link: "/",
    },
    {
        step: 2,
        title: "select plan",
        link: "step-2",
    },
    {
        step: 3,
        title: "add-ons",
        link: "step-3",
    },
    {
        step: 4,
        title: "summary",
        link: "step-4",
    },
];

export default function Sidebar() {
    return (
        <div className="side-bar min-h-[300px] pt-8">
            <ul className=" flex items-start justify-center gap-x-8 ">
                {aside.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className=" flex items-center justify-start group"
                                href={item.link}
                            >
                                <div className=" flex items-center justify-center group-hover:bg-background rounded-full group-hover:text-primary p-2 border border-background w-10 h-10 text-secondary font-semibold ">
                                    {item.step}
                                </div>
                                <div className="hidden">
                                    <h3>step {item.step}</h3>
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
