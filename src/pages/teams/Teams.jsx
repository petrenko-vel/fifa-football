import { Search } from '@/features/search'
import './Teams.scss'
import { Team } from '@/entities/team'

export const Teams = () => {
    return (
        <>
            <Search />
            <section className="cards">
                <div className="container">
                    <div className="cards__inner">
                        <Team />
                    </div>
                </div>
            </section>
        </>
    )
}
