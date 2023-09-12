"use client";

import { useRef } from "react";
import { Title } from "../components/titile";

interface Pops {
    id: string;
    ThemeSettings: {
        Set: (themeName: string) => void;
        Get: () => string | null;
    };
}
export const Contact = ({ id, ThemeSettings }: Pops) => {
    const name = useRef<HTMLInputElement>(null);
    const message = useRef<HTMLTextAreaElement>(null);

    const submit = () => {
        const msg = `[ ${name.current!.value} ]: ${message.current!.value}`;
        console.log(msg);

        const webHookURL =
            "https://discord.com/api/webhooks/1136646035482091550/Mf3YLzcH8irnt4mknlFmIzHk3myoQwZDsF7EoezW0g53hTfnIK60XahUC8HL0PPdez0_";

        const exampleEmbed = {
            color: 0x0099ff,
            description: msg,
            thumbnail: {
                url: "https://rustacean.net/more-crabby-things/rustdocs.png",
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: "",
                icon_url:
                    "https://rustacean.net/more-crabby-things/rustdocs.png",
            },
        };
        const xhr = new XMLHttpRequest();
        xhr.open("POST", webHookURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
            JSON.stringify({
                content: "🙦━━━━━{ 📪 New Email 🦀 }━━━━━🙤",
                username: "Email",
                embeds: [exampleEmbed],
            })
        );
        setTimeout(() => {
            // document.location.reload();
            name.current!.value = "";
            message.current!.value = "";
        }, 500);
    };
    return (
        <section id={id} className="pages unshow">
            <div className="contact">
                <Title title="Contact" />
                <div className="links">
                    <Link
                        title="github"
                        src={`/github_${ThemeSettings.Get()}.svg`}
                        link="https://github.com/aravns"
                    />
                    <Link
                        title="discord"
                        src="/discord.svg"
                        link="https://discord.com/invite/jEJWzn2dXv"
                        hex_color="7289da"
                    />
                    <Link
                        title="youtube"
                        src="/youtube.svg"
                        link="https://www.youtube.com/channel/UCRYDSKNGfj5ZA9d-nVjYeDQ"
                        hex_color="FF0000"
                    />
                    <Link
                        title="facebook"
                        src="/facebook.svg"
                        link="https://www.facebook.com/profile.php?id=100057051782272"
                        hex_color="4267B2"
                    />
                    <Link
                        title="instagram"
                        src="/instagram.svg"
                        link="https://www.instagram.com/aravns_"
                        hex_color="833AB4"
                    />
                </div>
                <div className="form">
                    <div className="name">
                        <span>{"👉"}</span>
                        <input ref={name} required type="text" />
                        <label>Name</label>
                    </div>
                    <div className="message">
                        <span>{"👉"}</span>
                        <textarea required ref={message} cols={30} rows={10} />
                        <label>Message</label>
                    </div>
                    <div className="send">
                        <button type="button" onClick={submit}>
                            <img
                                src="/send_emoji.svg"
                                alt=""
                                width={10}
                                height={10}
                            />
                            Send message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface Link {
    title: string;
    src: string;
    link: string;
    hex_color?: string;
}

const Link = ({ title, src, link, hex_color }: Link) => {
    return (
        <a target="_blank" rel="noreferrer" href={link}>
            <img src={src} alt="" width={10} height={10} />
            {hex_color && (
                <span style={{ color: `#${hex_color}` }}>{title}</span>
            )}
            {!hex_color && <span>{title}</span>}
        </a>
    );
};
