import { useState } from 'react'
import { Search } from '@/features/search'
import './Teams.scss'
import { Team } from '@/entities/team'

export const Teams = () => {
    const [query, setQuery] = useState('')

    return (
        <>
            <Search
                placeholder="Поиск команды..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <section className="cards">
                <div className="container">
                    <div className="cards__inner">
                        <Team query={query} />
                    </div>
                </div>
            </section>
        </>
    )
}
