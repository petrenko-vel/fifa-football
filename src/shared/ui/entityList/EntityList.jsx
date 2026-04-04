import { EntityCard } from '@/shared/ui/entityCard';

export const EntityList = ({ items, type, baseClass, showCountry }) => {
    if (!items || items.length === 0) return <p>Данные не найдены</p>;

    return (
        <>
            {items.map((item) => (
                <EntityCard
                    key={item.id}
                    data={item}
                    type={type}
                    baseClass={baseClass}
                    showCountry={showCountry}
                />
            ))}
        </>
    );
};