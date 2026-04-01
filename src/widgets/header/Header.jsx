

import './Header.scss'

const headerNavLinks = [
    {
        title: "Лиги",
        href: "#"
    },
    {
        title: "Команды",
        href: "#"
    }
]

export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a className="header__logo">
                        <img src="@/assets/img/logo.png" alt="FIFA" />
                    </a>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {headerNavLinks.map(({ title, href }) => (
                                <li className="header__nav-item" key={title}>
                                    <a href={href} className="header__nav-link">{title}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}