import { Search } from '@/features/search'
import { League } from '@/entities/league/League'
import './Leagues.scss'


export const Leagues = () => {
    return (
        <>
            <Search />
            <section className="cards">
                <div className="container">
                    <div className="cards__inner">
                        <League />
                    </div>
                </div>
            </section>
        </>
    )
}
