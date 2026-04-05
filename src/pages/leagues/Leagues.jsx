import { useState } from 'react'
import { Search } from '@/features/search'
import { League } from '@/entities/league/League'
import './Leagues.scss'


export const Leagues = () => {
    const [query, setQuery] = useState('')

    return (
        <>
            <Search
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <section className="cards">
                <div className="container">
                    <League query={query} />
                </div>
            </section>
        </>
    )
}
