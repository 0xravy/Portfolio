import { useEffect, useRef } from "react";
import { language, chageLanguage } from "../settings";

interface Pops {
    getTheme: () => string | null;
    changeTheme: (themeName: string) => void;
}

export const Navbar = ({ getTheme, changeTheme }: Pops) => {
    // icons
    const sun_icon: any = useRef<HTMLImageElement>();
    const moon_icon: any = useRef<HTMLImageElement>();
    const none = "none";
    const mylogo: any = useRef<HTMLImageElement>();

    chageLanguage(1);

    const toggleTheme = () =>
        changeTheme(getTheme() === "light" ? "dark" : "light");

    useEffect(() => {
        // theme vars
        const user_theme = localStorage.getItem("theme");
        const system_theme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // icons toggling
        const icons_toggle = () => {
            sun_icon.current!.classList.toggle(none);
            moon_icon.current!.classList.toggle(none);
        };

        // theme check
        const theme_check = () => {
            // On page load or when changing themes, best to add inline in `head` to avoid FOUC
            if (user_theme === "dark" || (!user_theme && system_theme)) {
                document.documentElement.classList.add("dark");
                moon_icon.current!.classList.add(none);
            } else {
                sun_icon.current!.classList.add(none);
            }
        };

        // theme switch
        const theme_switch = () => {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                icons_toggle();
                return;
            }
            document.documentElement.classList.add("dark");

            localStorage.setItem("theme", "dark");
            icons_toggle();
        };

        // call theme switch on clicking buttons
        sun_icon.current!.onclick = () => theme_switch();

        moon_icon.current!.onclick = () => theme_switch();

        theme_check();
    });

    return (
        <nav className="navbar">
            {/* logo */}
            <div className="h-full w-[12rem] flex justify-center items-center">
                <a href="#home">
                    <img
                        ref={mylogo}
                        className=" w-full h-[80px] rounded-lg transition-all duration-500 object-cover"
                        src="https://i.pinimg.com/originals/5e/5f/cd/5e5fcd2efe9b4eb3bbaace2a02b29185.gif"
                        alt=""
                    />
                </a>
            </div>

            {/* items in bar */}
            <div className="item underline">
                <a href="#home">{language.home.page}</a>
            </div>
            <div className="item underline">
                <a href="#about">{language.about.page}</a>
            </div>
            <div className="item underline">
                <a href="#projects">{language.projects.page}</a>
            </div>
            <div className="item underline">
                <a href="#contact">{language.contact.page}</a>
            </div>

            {/* button change theme */}
            <div className="theme">
                <img
                    ref={sun_icon}
                    className="theme-btn"
                    src="/sun.svg"
                    alt=""
                    width={10}
                    height={10}
                    onClick={toggleTheme}
                />
                <img
                    ref={moon_icon}
                    className="theme-btn"
                    src="/moon.svg"
                    alt=""
                    width={10}
                    height={10}
                    onClick={toggleTheme}
                />
            </div>
        </nav>
    );
};
