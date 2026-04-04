import { useState, useMemo } from 'react';
import { EntityCard } from '@/shared/ui/entityCard';
import { Pagination } from '@/shared/ui/pagination';

const ITEMS_PER_PAGE = 16;

export const EntityList = ({ items, type, modificator, showCountry }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (!items || items.length === 0) return <p>Данные не найдены</p>;

    const totalPages = useMemo(
        () => Math.ceil(items.length / ITEMS_PER_PAGE),
        [items]
    );

    const visibleItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return items.slice(start, start + ITEMS_PER_PAGE);
    }, [items, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {visibleItems.map((item) => (
                <EntityCard
                    key={item.id}
                    data={item}
                    type={type}
                    modificator={modificator}
                    showCountry={showCountry}
                />
            ))}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
};