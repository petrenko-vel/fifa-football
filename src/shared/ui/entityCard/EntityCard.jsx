import { Link } from 'react-router-dom';
import './EntityCard.scss';

export const EntityCard = ({ data, type, modificator, showCountry = true }) => {

    const name = data.name;
    const img = data.emblemUrl || data.crest;
    const country = data.area?.name;
    const id = data.id;

    return (
        <Link to={`/${type}/${id}`} className={`entity-card entity-card--${modificator}`}>
            <div className={`entity-card__img entity-card__img--${modificator}`}>
                <img src={img} alt={name} loading="lazy" />
            </div>
            <div className={`entity-card__info entity-card__info--${modificator}`}>
                <h3 className={`entity-card__title entity-card__title--${modificator}`}>{name}</h3>
                {showCountry && country && (
                    <p className={`entity-card__country entity-card__country--${modificator}`}>{country}</p>
                )}
            </div>
        </Link>
    );
};