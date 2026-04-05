import { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { MatchesTable } from '@/widgets/match-table/MatchTable';
import { Loader } from '@/shared/ui/loader';
import './MatchesList.scss';

export const MatchesList = () => {
  const { id } = useParams();
  const location = useLocation();

  const isLeague = location.pathname.includes('league');
  const apiUrl = isLeague ? `/api/competitions/${id}/matches` : `/api/teams/${id}/matches`;
  const breadcrumbRoot = isLeague ? 'Лиги' : 'Команды';

  const { data, loading, error } = useFetch(apiUrl);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredMatches = useMemo(() => {
    const matches = data?.matches || [];
    if (!dateFrom && !dateTo) return matches;

    return matches.filter((match) => {
      const matchDate = new Date(match.utcDate);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo + 'T23:59:59') : null;

      if (from && matchDate < from) return false;
      if (to && matchDate > to) return false;
      return true;
    });
  }, [data, dateFrom, dateTo]);

  const hasFilter = dateFrom || dateTo;

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
  };

  if (loading) return <Loader />;
  if (error) return <div className='matches-list__error'>Ошибка: {error}</div>;

  return (
    <div className="matches-list">
      <div className="container container--header">
        <nav className="breadcrumbs">
          {breadcrumbRoot} {' > '}  {isLeague ? data?.competition?.name : data?.matches[0]?.homeTeam.name}
        </nav>
      </div>
      <div className="container">
        <div className="matches-list__date-filters">
          <div className="matches-list__date-filters-start">
            <span className='matches-list__date-filters-text'>Матчи с</span>
            <input
              type="date"
              value={dateFrom}
              max={dateTo || undefined}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="matches-list__date-filters-end">
            <span className='matches-list__date-filters-text'>по</span>
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          {hasFilter && (
            <button className="matches-list__reset" onClick={handleReset}>
              Сбросить
            </button>
          )}
        </div>

        {filteredMatches.length === 0 ? (
          <p className="matches-list__empty">Матчи за выбранный период не найдены</p>
        ) : (
          <MatchesTable key={`${dateFrom}-${dateTo}`} matches={filteredMatches} />
        )}
      </div>
    </div>
  );
};
