import useFetch from '@/hooks/useFetch';
import { EntityList } from '@/shared/ui/entityList';
import { Loader } from '@/shared/ui/loader';
import './Team.scss';

export const Team = () => {
    const { data, loading, error } = useFetch('/api/teams');

    if (loading) return <Loader />;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <EntityList
            items={data?.teams}
            type="teams"
            modificator="team"
            showCountry={false}
        />
    );
};