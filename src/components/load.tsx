import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";

export const Load = ({ setMain }: { setMain: (lala: string) => void }) => {

    const load = useRef<HTMLDivElement>(null);
    const hackerText = useRef<HTMLSpanElement>(null);
    const topText = useRef<HTMLDivElement>(null);

    // setTimeout(() => load.current!.style.display = 'none', 3000)

    useEffect(() => {
        const textElement = hackerText.current!;
        const originalText = textElement.innerHTML;

        function scrambleText() {
            let scrambledText = '';

            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.5) {
                    scrambledText += String.fromCharCode(Math.random() * 94 + 33);
                } else {
                    scrambledText += originalText[i];
                }
            }

            scrambledText = scrambledText.substring(0, originalText.length);

            textElement.innerHTML = scrambledText;
        }

        let mores: any;
        setTimeout(() => mores = setInterval(scrambleText, 50), 75);


        const time = 2000;
        const timePlus = 500;


        setTimeout(() => {
            clearInterval(mores);
            textElement.style.color = "#fff";
            topText.current!.style.opacity = '1';
            textElement.innerHTML = "[aravan@dev]";
        }, time)

        setTimeout(() => load.current!.onclick = () => {
            load.current!.style.opacity = '0';
            setMain("block")

            setTimeout(() => {
                load.current!.style.display = 'none'
            }, time + timePlus)
        }, time + timePlus)



    });

    return (
        <div ref={load} className="load lanim">
            <div ref={topText}>
                <TypeIt
                    options={{
                        strings: ["Don't click me 0_0"],
                        speed: 150,
                        loopDelay: 1000,
                        startDelay: 1500,
                        waitUntilVisible: true,
                    }}
                />
            </div>
            <span ref={hackerText}>.-.. .- .-.. .-</span>
        </div>
    );
}
