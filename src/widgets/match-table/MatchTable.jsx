import { useState, useMemo } from 'react';
import { Pagination } from '@/shared/ui/pagination';
import './MatchTable.scss';

const ITEMS_PER_PAGE = 10;

export const MatchesTable = ({ matches }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(
        () => Math.ceil(matches.length / ITEMS_PER_PAGE),
        [matches]
    );

    const visibleMatches = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return matches.slice(start, start + ITEMS_PER_PAGE);
    }, [matches, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <ul className="matches-list__table matches-table">
                {visibleMatches.map((match) => (
                    <li key={match.id} className="matches-table__item">
                        <div className="matches-table__info">
                            <div className="matches-table__date">{new Date(match.utcDate).toLocaleDateString()}</div>
                            <div className="matches-table__time">{new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            <div className="matches-table__status">{match.status}</div>
                            <div className="matches-table__teams">
                                {match.homeTeam.name} — {match.awayTeam.name}
                            </div>
                        </div>
                        <div className="matches-table__score">
                            {match.score.fullTime.home ?? '-'}:{match.score.fullTime.away ?? '-'}
                            {match.score.extraTime && ` (${match.score.extraTime.home}:${match.score.extraTime.away})`}
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};