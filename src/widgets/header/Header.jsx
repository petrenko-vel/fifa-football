import { NavLink, useMatch } from 'react-router-dom'
import Logo from '@/assets/img/logo.png'
import './Header.scss'

const headerNavLinks = [
    {
        title: "Лиги",
        href: "/",
        activeOn: ["/", "/leagues/:id"]
    },
    {
        title: "Команды",
        href: "/teams",
        activeOn: ["/teams", "/teams/:id"]
    }
]

const NavItem = ({ title, href, activeOn }) => {
    const matchRoot = useMatch({ path: activeOn[0], end: true });
    const matchSub = useMatch({ path: activeOn[1], end: false });
    const isActive = Boolean(matchRoot || matchSub);

    return (
        <li className="header__item">
            <NavLink
                to={href}
                className={`header__link ${isActive ? 'header__link--active' : ''}`}
            >
                {title}
            </NavLink>
        </li>
    );
};

export const Header = () => {
    return (
        <header className="header">
            <div className="container container--header">
                <div className="header__inner">
                    <NavLink to="/" className="header__logo">
                        <img src={Logo} alt="FIFA" />
                    </NavLink>
                    <nav className="header__navbar">
                        <ul className="header__menu">
                            {headerNavLinks.map((link) => (
                                <NavItem key={link.title} {...link} />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
