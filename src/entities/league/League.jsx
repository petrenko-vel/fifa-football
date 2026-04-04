import useFetch from '@/hooks/useFetch';
import { EntityList } from '@/shared/ui/entityList';
import './League.scss';

export const League = () => {
    const { data, loading, error } = useFetch('https://api.football-data.org/v4/competitions');

    if (loading) return <div>Загрузка лиг...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="league-grid">
            <EntityList
                items={data?.competitions}
                type="leagues"
                baseClass="league"
                showCountry={true}
            />
        </div>
    );
};