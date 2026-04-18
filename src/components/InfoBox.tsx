import TypeWriter from "./TypeWriter";
import {Link} from "react-router-dom";

type InfoButton = {
    label: string;
    href?: string;
    to?: string
};

type InfoBoxProps = {
    title: string;
    text: string;
    speed?: number;
    buttons: InfoButton[];
};

export default function InfoBox({
                                    title,
                                    text,
                                    speed = 100,
                                    buttons,
                                }: InfoBoxProps) {
    return (
        <div className="card">
            <h2>{title}</h2>

            <TypeWriter text={text} speed={speed} />

            <div className="card-buttons">
                {buttons.map((btn, index) =>
                    btn.to ? (
                        <Link key={index} to={btn.to}>
                            {btn.label}
                        </Link>
                    ) : (
                        <a key={index} href={btn.href} target="_blank">
                            {btn.label}
                        </a>
                    )
                )}
            </div>
        </div>
    );
}