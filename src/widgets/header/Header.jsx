import { NavLink } from 'react-router-dom'
import Logo from '@/assets/img/logo.png'
import './Header.scss'

const headerNavLinks = [
    {
        title: "Лиги",
        href: "/"
    },
    {
        title: "Команды",
        href: "/teams"
    }
]

export const Header = () => {
    return (
        <header className="header">
            <div className="container container--header">
                <div className="header__inner">
                    <NavLink to="/" className="header__logo">
                        <img src={Logo} alt="FIFA" />
                    </NavLink>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {headerNavLinks.map(({ title, href }) => (
                                <li className="header__nav-item" key={title}>
                                    <NavLink
                                        to={href}
                                        className={({ isActive }) =>
                                            `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                                        }
                                    >
                                        {title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
