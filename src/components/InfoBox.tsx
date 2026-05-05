import TypeWriter from "./TypeWriter";
import {Link} from "react-router-dom";
import styles from "./InfoBox.module.css";

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
        <div className={styles.card}>
            <h2>{title}</h2>

            <TypeWriter text={text} speed={speed} />

            <div className={styles.buttons}>
                {buttons.map((btn, index) =>
                    btn.to ? (
                        <Link key={index} to={btn.to} className={styles.button}>
                            {btn.label}
                        </Link>
                    ) : (
                        <a key={index} href={btn.href} target="_blank" className={styles.button}>
                            {btn.label}
                        </a>
                    )
                )}
            </div>
        </div>
    );
}