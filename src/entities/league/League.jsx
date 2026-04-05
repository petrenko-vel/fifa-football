import useFetch from '@/hooks/useFetch';
import { EntityList } from '@/shared/ui/entityList';
import './League.scss';

export const League = () => {
    const { data, loading, error } = useFetch('/api/competitions');

    if (loading) return <div>Загрузка лиг...</div>;
    if (error) return <div>Ошибка: {error}</div>;


    return (
        <EntityList
            items={data?.competitions}
            type="leagues"
            modificator="league"
            showCountry={true}
        />
    );
};