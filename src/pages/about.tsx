"use client";

import { Title } from "../components/titile";
import { useRef, useEffect } from "react";
import TypeIt from "typeit-react";

interface Pops {
    id: string;
}

export const About = ({ id }: Pops) => {
    const about_text = `
Hello
I am Abdul Rahman from the Kingdom of Saudi Arabia

I started learning programming when I was fifteen years old

At that time, I did not have a computer, so I started using my father's phone

Which was iPhone 6 the reason I got into programming at that time

And I continue until now is that the computer teacher said that the programmer’s profession is the future and it is fun and brings high income 🙂 I thought that I would become rich if I learned it, so I started in 04/07/2019 following explanations of the Python language most of the day and continued and even learned until I reached the stage I am in now
    `


    const screen = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newLALA: HTMLDivElement = document.createElement("div");
        newLALA.innerHTML = `<marquee direction="down" className="w-full h-full" behavior="alternate"><marquee behavior="alternate">Coming Soon...</marquee></marquee>`;
        if (screen.current!.children.length === 0) { screen.current!.appendChild(newLALA); }
    });

    return (
        <section id={id} className="pages unshow">
            <div className="about">
                <Title title="About" />
                <div className="two-div content">
                    <TypeIt
                        options={{
                            strings: about_text,
                            speed: 30,
                            loopDelay: 1000,
                            waitUntilVisible: true,
                        }}
                    />
                </div>
                <div className="two-div img">
                    <div className="lala">
                        <div ref={screen} className="screen"></div>
                        <img src="/TV.svg" alt="" width={500} height={500} />
                    </div>
                </div>
            </div>
        </section >
    );
};

