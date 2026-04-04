import useFetch from '@/hooks/useFetch';
import { EntityList } from '@/shared/ui/entityList';
import './Team.scss';

export const Team = () => {
    const { data, loading, error } = useFetch('https://api.football-data.org/v4/teams');

    if (loading) return <div>Загрузка команд...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="team-grid">
            <EntityList
                items={data?.teams}
                type="teams"
                baseClass="team"
                showCountry={false}
            />
        </div>
    );
};