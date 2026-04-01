import './Search.scss'

export const Search = ({ placeholder = "Search", ...props }) => {
    return (
        <div className="search">
            <div className="container">
                <div className="search__inner">
                    <svg
                        className="search__icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        className="search__input"
                        placeholder={placeholder}
                        {...props}
                    />
                </div>
            </div>
        </div>
    )
}
