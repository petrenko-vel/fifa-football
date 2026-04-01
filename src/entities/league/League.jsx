import league1 from '@/assets/img/league1.png'
import league2 from '@/assets/img/league2.png'
import './League.scss'

const league = [
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league2,
    },
    {
        name: "Africa Cup",
        country: "Africa",
        img: league1,
    },
]

export const League = () => {
    return (
        <>
            {league.map(({ name, country, img }, index) => (
                <div className="league-card" key={index}>
                    <div className="league-card__img">
                        <img src={img} alt={name} />
                    </div>
                    <div className="league-card__info">
                        <h3 className="league-card__title">{name}</h3>
                        <p className="league-card__country">{country}</p>
                    </div>
                </div>
            ))}
        </>
    )
}