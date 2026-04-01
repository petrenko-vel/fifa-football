import { Search } from '@/features/search'
import { League } from '@/entities/league/League'
import './Leagues.scss'


export const Leagues = () => {
    return (
        <>
            <Search />
            <section className="leagues">
                <div className="container">
                    <div className="leagues__inner">
                        <League />
                    </div>
                </div>
            </section>
        </>
    )
}
