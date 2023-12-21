import { Title } from "../components/titile";
import { useRef, useEffect } from "react";
import TypeIt from "typeit-react";

interface Pops {
    id: string;
}

export const About = ({ id }: Pops) => {
    const about_text = `
\tI am AbdulRahman from Saudi Arabia, and I started learning programming in 2015. My primary expertise lies in websites and design, while I also have experience in applications and bots. I am proficient in several programming languages, such as Python, JavaScript, C#, C/C++, and Rust.
<br><br>
However, my main focus is on JavaScript and Rust, as these are the languages I am most adept at. I also manage a YouTube channel where I share my thoughts and insights. Feel free to check out my latest video, which you can find it on old TV.`;


    const screen = useRef<HTMLDivElement>(null);

    const loadVideo = async (iframe: any) => {
        const cid = "UCS9HzA5yTy1zLEjogLNBBVA"; // channel id
        const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`);
        const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;

        await fetch(reqURL)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                const videoNumber = 0; // 0 mean last video
                const link = result.items[videoNumber].link;
                const id = link.substr(link.indexOf("=") + 1);
                iframe.setAttribute("src", `https://youtube.com/embed/${id}?controls=1&autoplay=0`);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        //     const newLALA: HTMLDivElement = document.createElement("div");
        //     newLALA.innerHTML = `
        //     <marquee style="background: blue;" direction="down" className="w-full h-full relative" behavior="alternate">
        //             <div className="absolute left-0">
        //                 <p className="text-[#fff]">
        //                     Coming Soon...
        //                 </p>
        //             </div>
        //     </marquee>`;
        //     if (screen.current!.children.length === 0) { screen.current!.appendChild(newLALA); }

        const iframe = document.getElementById("iframe");
        loadVideo(iframe);
    });

    return (
        <section id={id} className="pages unsho">
            <div className="about">
                <Title title="About" />
                <div className="two-div content">
                    <TypeIt
                        options={{
                            strings: about_text,
                            speed: 30,
                            waitUntilVisible: true,
                        }}
                    />
                    
                </div>
                <div className="two-div img">
                    <div className="lala">
                        <div ref={screen} className="screen">
                            {
                                (<iframe id="iframe" className="w-full h-full" />)
                            }
                        </div>
                        <img src="/TV.svg" alt="" width={500} height={500} />
                    </div>
                </div>
            </div>
        </section >
    );
};

