interface Home {
    page: string;
    text: string[];
}
interface About {
    page: string;
    text: string[];
}
interface Projects {
    page: string;
}
interface Contact {
    page: string;
    embed: string[];
    links: string[];
}

interface Pages {
    home: Home;
    about: About;
    projects: Projects;
    contact: Contact;
}

const languages: Pages[] = [
    {
        // >>>>>  English
        home: {
            page: "home",
            text: [
                "Welcome to my website. hi i am aravan.",
                "i am Fullstack developer. i am 18 years old.",
                "and i have 4+ years in programming",
                "and i use archlinux for programming",
            ],
        },
        about: {
            page: "about",
            text: [
                "Before I begin, I must confess that I have no idea what I",
                "will write to express myself. However, I am a person who",
                "loves programming because it allows for creativity and the",
                "expression of ideas. On this old TV, I will display a simple",
                "thing from my experience. I was confused about what to put",
                "on the TV while writing this, and the text you are reading",
                "is something I had no idea about putting on the TV. Since",
                "you are reading my words, I must have finished the site and",
                "put something on the TV. I hope it is good and that you like",
                "it. Enjoy!",
            ],
        },
        projects: {
            page: "projects",
        },
        contact: {
            page: "contact",
            embed: ["name", "message", "send message"],
            links: ["discord", "youtube", "github"],
        },
    },
    {
        // >>>>> العربيه
        home: {
            page: "المنزل",
            text: [
                "Welcome to my website. hi i am aravan.",
                "i am Fullstack developer. i am 18 years old.",
                "and i have 4+ years in programming",
                "and i use archlinux for programming",
            ],
        },
        about: {
            page: "عني",
            text: [
                "Before I begin, I must confess that I have no idea what I",
                "will write to express myself. However, I am a person who",
                "loves programming because it allows for creativity and the",
                "expression of ideas. On this old TV, I will display a simple",
                "thing from my experience. I was confused about what to put",
                "on the TV while writing this, and the text you are reading",
                "is something I had no idea about putting on the TV. Since",
                "you are reading my words, I must have finished the site and",
                "put something on the TV. I hope it is good and that you like",
                "it. Enjoy!",
            ],
        },
        projects: {
            page: "المشاريع",
        },
        contact: {
            page: "للتواصل",
            embed: ["الاسم", "الرساله", "ارسال الرساله"],
            links: ["ديسكورد", "يوتيوب", "قيت هوب"],
        },
    },
];

/**
 *  chose language then chage index of settings
 *  1: English (_Default_)
 *  2: arabic
 */

let j: 0 | 1 = 0;
export const chageLanguage = (n: 0 | 1): void => {
    j = n;
};
export const language = languages[j];
