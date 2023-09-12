import { useEffect, useRef } from "react";

interface Pops {
    getTheme: () => string | null;
    changeTheme: (themeName: string) => void;
}

export const MobileNav = ({ getTheme, changeTheme }: Pops) => {
    const toggleTheme = () =>
        changeTheme(getTheme() === "light" ? "dark" : "light");

    const burger = useRef<HTMLDivElement>(null),
        header = useRef<HTMLDivElement>(null),
        menu = useRef<HTMLUListElement>(null);

    // ++++++++++++++++

    // icons
    const sun_icon: any = useRef();
    const moon_icon: any = useRef();
    const none = "none";

    useEffect(() => {
        burger.current!.onclick = () =>
            header.current!.classList.toggle("menu-opened");

        let items = menu.current?.children!;
        for (let i = 0; i < items.length; i++) {
            items
                .item(i)
                ?.addEventListener("click", () =>
                    header.current!.classList.toggle("menu-opened")
                );
        }

        // theme vars
        const user_theme = localStorage.getItem("theme");
        const system_theme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // icons toggling
        const icons_toggle = () => {
            sun_icon.current.classList.toggle(none);
            moon_icon.current.classList.toggle(none);
        };

        // theme check
        const theme_check = () => {
            // On page load or when changing themes, best to add inline in `head` to avoid FOUC
            if (user_theme === "dark" || (!user_theme && system_theme)) {
                document.documentElement.classList.add("dark");
                moon_icon.current.classList.add(none);
            } else {
                sun_icon.current.classList.add(none);
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
        sun_icon.current.onclick = () => {
            theme_switch();
        };
        moon_icon.current.onclick = () => {
            theme_switch();
        };

        theme_check();
    });

    return (
        <div ref={header} className="header">
            <div className="top-bar">
                <div ref={burger} className="burger-container">
                    <div className="burger">
                        <div className="bar topBar"></div>
                        <div className="bar btmBar"></div>
                    </div>
                </div>
                {/* button change theme */}
                <div className="theme">
                    <img
                        ref={sun_icon}
                        className="theme-btn"
                        src="/sun.svg"
                        alt=""
                        width={30}
                        height={30}
                        onClick={toggleTheme}
                    />
                    <img
                        ref={moon_icon}
                        className="theme-btn"
                        src="/moon.svg"
                        alt=""
                        width={30}
                        height={30}
                        onClick={toggleTheme}
                    />
                </div>
            </div>
            <ul ref={menu} className="menu">
                <Item content="Home" tag="home" />
                <Item content="About" tag="about" />
                <Item content="Projects" tag="projects" />
                <Item content="Contact" tag="contact" />
            </ul>
        </div>
    );
};

const Item = ({ content, tag }: { content: string; tag: string }) => {
    return (
        <li className="menu-item">
            <a href={"#" + tag}>{content}</a>
        </li>
    );
};
