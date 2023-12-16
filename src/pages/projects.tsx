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
    git?: string;
    demo?: string;
    image: string;
    title: string;
    desc: string;
}

export const Projects = ({ id }: Pops) => {
    let [cards, setCards] = useState<Project[]>([]);
    let cards_num: number = cards.length <= 3 ? cards.length : 3;
    const [card_n, card_n_update] = useState(3);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3003/api/data`);
            const result = await response.json();
            setCards(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 1000) cards_num = 1;
            else cards_num = 3;
            card_n_update(cards_num);
        });

        if (window.innerWidth <= 1000) cards_num = 1;
        else cards_num = 3;
        card_n_update(cards_num);
    }, []);

    return (
        <section id={id} className="pages unshow">
            <div className="projects">
                <Title title="Projects" />
                <div className="cards">
                    <Swiper
                        className="w-full h-full"
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
                        effect={"slide"}
                        spaceBetween={50}
                        slidesPerView={card_n}
                        freeMode={{ enabled: true }}
                        data-swiper-autoplay="500"
                        navigation={{ nextEl: ".right", prevEl: ".left" }}
                    >
                        {cards.map((card, i) => {
                            return (
                                <SwiperSlide key={i} className="card">
                                    <div className="img">
                                        <img src={card.image} alt="" />
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
                            )
                        })}
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

