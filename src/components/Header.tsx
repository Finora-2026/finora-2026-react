import logo from '../assets/investment-calculator-logo.png'
import styles from './Header.module.css'

export default function Header() {
    return <header className={styles.header}>
        <img src={logo} alt="Logo showing a money bag"></img>
        <h1>Investment Calculator</h1>
    </header>
}