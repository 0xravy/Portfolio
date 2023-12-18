import { Navbar } from "../components/navbar";
import { MobileNav } from "../components/mobile_nav";

interface Pops {
    id: string;
    ThemeSettings: {
        Set: (themeName: string) => void;
        Get: () => string | null;
    };
}

export const Home = ({ id, ThemeSettings }: Pops) => {
    return (
        <section id={id} className="pages">
            <Navbar
                getTheme={() => ThemeSettings.Get()}
                changeTheme={(name) => {
                    ThemeSettings.Set(name);
                }}
            />
            <MobileNav
                getTheme={() => ThemeSettings.Get()}
                changeTheme={(name) => {
                    ThemeSettings.Set(name);
                }}
            />
            <div className="home">
                <div className="two-div content">
                    <span className="l" />
                    <p className="hidden sm:block">
                        <span className="text-light-red dark:text-dark-red">
                            Welcome
                        </span>{" "} to my website. hi i am ravy. <br />
                        i am{" "}
                        <span className="text-light-blue dark:text-dark-blue">
                            Fullstack
                        </span>{" "}
                        developer. i am {new Date().getFullYear() - 2005} years
                        old. <br /> and i have more then{" "}
                        <span className="text-light-green dark:text-dark-green">
                            {new Date().getFullYear() - 2019}
                        </span>{" "}
                        years in programming,<br />
                        and i use archlinux for programming.
                    </p>
                    <p className="sm:hidden block">
                        <span className="text-light-red dark:text-dark-red">
                            Welcome
                        </span>{" "}
                        to my website. hi i am ravy. i am{" "}
                        <span className="text-light-blue dark:text-dark-blue">
                            Fullstack
                        </span>{" "}
                        developer. i am {new Date().getFullYear() - 2005} years
                        old. and i have more then{" "}
                        <span className="text-light-green dark:text-dark-green">
                            {new Date().getFullYear() - 2019}
                        </span>{" "}
                        years in programming and i use archlinux for programming
                    </p>
                </div>
                <div className="two-div img">
                    <div className="myimg">
                        <ul>
                            {[
                                "https://brandeps.com/icon-download/L/Linux-icon-vector-02.svg",
                                "https://docs.rs/-/rustdoc.static/rust-logo-151179464ae7ed46.svg",
                                "https://brandeps.com/icon-download/C/C-sharp-icon-vector-01.svg",
                                "https://brandeps.com/logo-download/E/Edinburgh-JS-logo-vector-01.svg",
                                "https://brandeps.com/icon-download/P/Python-icon-vector-04.svg",
                                "https://brandeps.com/icon-download/R/React-icon-vector-05.svg",
                                "https://brandeps.com/logo-download/F/Figma-logo-vector-01.svg",
                                "https://img.freepik.com/free-icon/math_318-575896.jpg",
                            ].map((lala_src: string) => (
                                <li>
                                    <div>
                                        <img src={lala_src} alt="" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <img
                            src={`/logo_${ThemeSettings.Get() ?? "light"}.svg`}
                            alt=""
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
