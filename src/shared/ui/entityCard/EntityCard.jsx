import { Link } from 'react-router-dom';

export const EntityCard = ({ data, type, baseClass, showCountry = true }) => {
    // Адаптируем ключи API (emblemUrl для лиг, crest для команд)
    const name = data.name;
    const img = data.emblemUrl || data.crest;
    const country = data.area?.name;
    const id = data.id;

    return (
        <Link to={`/${type}/${id}`} className={`${baseClass}-card`}>
            <div className={`${baseClass}-card__img`}>
                {img ? <img src={img} alt={name} /> : <div className="placeholder" />}
            </div>
            <div className={`${baseClass}-card__info`}>
                <h3 className={`${baseClass}-card__title`}>{name}</h3>
                {showCountry && country && (
                    <p className={`${baseClass}-card__country`}>{country}</p>
                )}
            </div>
        </Link>
    );
};