import { useState, useMemo } from 'react';
import { EntityCard } from '@/shared/ui/entityCard';
import { Pagination } from '@/shared/ui/pagination';
import './EntityList.scss';


const ITEMS_PER_PAGE = 16;

export const EntityList = ({ items, type, modificator, showCountry, query = '' }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = useMemo(() => {
        if (!items) return [];
        if (!query.trim()) return items;
        const q = query.toLowerCase().trim();
        return items.filter((item) => {
            const name = item.name?.toLowerCase() ?? '';
            const country = item.area?.name?.toLowerCase() ?? '';
            return name.includes(q) || country.includes(q);
        });
    }, [items, query]);

    const totalPages = useMemo(
        () => Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
        [filteredItems]
    );

    const visibleItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!items || items.length === 0) return <p>Данные не найдены</p>;

    if (filteredItems.length === 0) {
        return <p className="entity-list__empty">По запросу «{query}» ничего не найдено</p>;
    }

    return (
        <>
            <div className="cards__inner">
                {visibleItems.map((item) => (
                    <EntityCard
                        key={item.id}
                        data={item}
                        type={type}
                        modificator={modificator}
                        showCountry={showCountry}
                    />
                ))}
            </div>
            <Pagination
                key={query}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};