"use client";

import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { AiTwotoneBoxPlot } from "react-icons/ai";

// import Swiper core and required modules
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectFade,
    FreeMode,
    EffectCoverflow,
    Autoplay,
    Virtual,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Title } from "../components/titile";
import { useEffect, useState } from "react";

interface Pops {
    id: string;
}

interface Project {
    key: number;
    img: string;
    title: string;
    desc: string;
    git?: string;
    demo?: string;
}

export const Projects = ({ id }: Pops) => {
    const cards: Project[] = [
        {
            key: 0,
            img: "https://camo.githubusercontent.com/7774e9ed866232676e021b062f9b8965cdbcd6ce41a397a2a9ad7dc0099a3ff4/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f313034353437333630373330353934313035332f313133363231393536393936333430353431322f7069632d66756c6c2d3233303830322d313434392d34392e706e673f77696474683d31303736266865696768743d363035",
            title: "rust loading console",
            desc: "this is just rust loading animation in console",
            git: "https://github.com/aravns/rust_console_loading",
        },
        {
            key: 1,
            img: "https://imgs.search.brave.com/4HZ3q-u6EkYGcg-6zBJ6o01LWirq7w6cDWqMSIO-S-w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM1/NDUxNTQ1L3Bob3Rv/L251Z2dldC1nb2xk/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0xYnQ5MjRvWEc0/UkZLWGc4Q2dBQm91/c0RNR3ZVTHJoZDA0/T0I0VEpfUTM4PQ",
            title: "Golden Craft",
            desc: "this is app for gold store im using [html, css, js, and rust] to build in app",
            git: "https://github.com/aravns/gold_rs",
            demo: "https://aravns.github.io/gold_rs/src/",
        },
        {
            key: 2,
            img: "https://imgs.search.brave.com/fT6XZGy2qL-RTVhB5bNXl74nWpeLRAHlbZm-IJgoIkI/rs:fit:867:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/MUtkazFDVDl0TGx0/X25RNzFJUkZnSGFF/RCZwaWQ9QXBp",
            title: "Agario Game",
            desc: "this game build using javascript & p5.js",
            git: "https://github.com/aravns/agario-game",
            demo: "https://aravns.github.io/agario-game/",
        },
        {
            key: 3,
            img: "https://raw.githubusercontent.com/aravns/discord-template-next.js-tailwindcss-typescript/main/imgs/i1.png",
            title: "Discord Front-End",
            desc: "Next.js + TailwindCSS",
            git: "https://github.com/aravns/discord-template-next.js-tailwindcss-typescript",
        },
        {
            key: 4,
            img: "https://raw.githubusercontent.com/aravns/movie-news-front-end.io/master/pic-full-230823-2020-35.png",
            title: "Recmove",
            desc: "moves news website Front-End",
            git: "https://github.com/aravns/movie-news-front-end.io",
            demo: "https://aravns.github.io/movie-news-front-end.io/",
        },
        {
            key: 4,
            img: "https://raw.githubusercontent.com/aravns/challenge/master/pic-full-230823-2029-10.png",
            title: "هندسة كهربائية",
            desc: "موقع تحدي",
            git: "https://github.com/aravns/challenge",
            demo: "https://aravns.github.io/challenge/",
        },
    ];

    let cards_num: number = cards.length <= 3 ? cards.length : 3;

    const [card_n, card_n_update] = useState(3);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1000) cards_num = 1;
            else cards_num = 3;
            card_n_update(cards_num);
        });

        if (window.innerWidth <= 1000) cards_num = 1;
        else cards_num = 3;
        card_n_update(cards_num);
    });

    return (
        <section id={id} className="pages unshow">
            <div className="projects">
                <Title title="Projects" />
                <div className="cards">
                    <Swiper
                        className="w-full h-full" // this must be take full width and height of his father
                        // install Swiper modules
                        modules={[
                            Navigation,
                            Pagination,
                            Scrollbar,
                            A11y,
                            EffectFade,
                            Autoplay,
                            Virtual,
                            FreeMode,
                            // effects
                            EffectCoverflow,
                        ]}
                        // Transition effect. Can be 'slide', 'fade', 'cube', 'coverflow', 'flip' or 'creative'
                        effect={"slide"}
                        spaceBetween={50}
                        slidesPerView={card_n}
                        // ++++
                        freeMode={{ enabled: true }}
                        data-swiper-autoplay="500"
                        // loop={true}
                        // autoplay={{ delay: 1000 }}
                        // virtual={true}
                        // autoplay={true}
                        navigation={{ nextEl: ".right", prevEl: ".left" }}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        // scrollbar={{ draggable: true }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log("slide change")}
                    >
                        {cards.map((card) => (
                            <SwiperSlide key={card.key} className="card">
                                <div className="img">
                                    <img src={card.img} alt="" />
                                </div>
                                <div className="content">
                                    <div className="title">{card.title}</div>
                                    <div className="desc">{card.desc}</div>
                                    <div className="buttons">
                                        {card.git && (
                                            <a href={card.git} target="_blank">
                                                <button>git</button>
                                            </a>
                                        )}
                                        {card.demo && (
                                            <a href={card.demo} target="_blank">
                                                <button>demo</button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="div-footer">
                    <div className="left">
                        <BiSolidLeftArrow size={40} />
                    </div>
                    <div className="center">
                        <AiTwotoneBoxPlot size={40} />
                    </div>
                    <div className="right">
                        <BiSolidRightArrow size={40} />
                    </div>
                </div>
            </div>
        </section>
    );
};
