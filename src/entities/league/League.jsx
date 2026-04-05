import useFetch from '@/hooks/useFetch';
import { EntityList } from '@/shared/ui/entityList';
import { Loader } from '@/shared/ui/loader';
import './League.scss';

export const League = ({ query }) => {
    const { data, loading, error } = useFetch(`/api/competitions`);

    if (loading) return <Loader />;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <EntityList
            items={data?.competitions}
            type="leagues"
            modificator="league"
            showCountry={true}
            query={query}
        />
    );
};