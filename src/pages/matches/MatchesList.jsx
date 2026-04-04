import { useParams, useLocation } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { MatchesTable } from '@/widgets/match-table/MatchTable';
import './MatchesList.scss';

export const MatchesList = () => {
  const { id } = useParams();
  const location = useLocation();

  // Определение, что загружать: команду или лигу
  const isLeague = location.pathname.includes('league');
  const apiUrl = isLeague ? `/api/competitions/${id}/matches` : `/api/teams/${id}/matches`;
  const breadcrumbRoot = isLeague ? 'Лиги' : 'Команды';

  const { data, loading, error } = useFetch(apiUrl);

  if (loading) return <div className='matches-list__loading'>Загрузка...</div>;
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
            <input type="date" />
          </div>
          <div className="matches-list__date-filters-end">
            <span className='matches-list__date-filters-text'>по</span>
            <input type="date" />
          </div>
        </div>

        <MatchesTable matches={data?.matches || []} />
      </div>
    </div>
  );
};