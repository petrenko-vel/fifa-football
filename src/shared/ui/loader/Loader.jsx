import './Loader.scss'

export const Loader = () => {
    return (
        <div className="loader" role="status" aria-label="Загрузка">
            <div className="loader__ring">
                {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="loader__dot" style={{ '--i': i }} />
                ))}
            </div>
        </div>
    )
}
