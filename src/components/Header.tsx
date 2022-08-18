import styles from './Header.module.css'
import Logo from './../assets/logo.svg'

export function Header() {
    return (
        <header className={styles.head}>
            <img src={Logo} alt="ToDo Logo" />
        </header>
    )
}