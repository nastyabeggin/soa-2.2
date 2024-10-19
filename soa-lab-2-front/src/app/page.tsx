'use client';

import styles from "./page.module.css";
import { Table } from "@/app/components/Table";
import { DEFAULT_SORT_ORDER, SortContext, SortOrderMap } from "@/app/context/sort";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/app/components/Button";
import { FilterIcon, PlusIcon } from "@/static/icons";
import { AddBandModal } from "@/app/components/AddBandModal";
import { SpecialActions } from "@/app/components/SpecialActions";
import { DEFAULT_PAGE, DEFAULT_SIZE, PaginationContext } from "@/app/context/pagination";
import { PaginationSize } from "@/app/components/PaginationSize";
import { DEFAULT_FILTERS, FilterContext, FilterMap } from "@/app/context/filter";
import { Filters } from "@/app/components/Filters";
import { getAllGenres, getBands } from "@/app/queries/bands";
import { Band } from "@/app/types/bands";
import { getSortQuery } from "@/app/utils/sort";
import { getFilterQuery } from "@/app/utils/filter";
import { BandsContext } from "./context/bands";
import toast, { Toaster } from 'react-hot-toast';
import { GenresContext } from "@/app/context/genres";

export default function Home() {
    const [sortOrder, setSortOrder] = useState<SortOrderMap>(DEFAULT_SORT_ORDER);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [size, setSize] = useState<number>(DEFAULT_SIZE);
    const [totalPages, setTotalPages] = useState<number>(DEFAULT_SIZE);
    const [filters, setFilters] = useState<FilterMap>(DEFAULT_FILTERS);
    const [canFetch, setCanFetch] = useState<number>(0);

    const [genres, setGenres] = useState<string[]>([]);
    const [bands, setBands] = useState<Band[]>([]);

    const [isAddBandModalVisible, setAddBandModalVisible] = useState<boolean>(false);
    const [isFiltersModalVisible, setFiltersModalVisible] = useState<boolean>(false);
    const prevSortOrder = useRef(sortOrder);
    const prevPage = useRef(page);
    const prevSize = useRef(size);
    const prevFilters = useRef(filters);

    useEffect(() => {
        // Store previous values using useRef
    
        const fetchBands = async () => {
            const params = {
                sort: getSortQuery(sortOrder),
                filter: getFilterQuery(filters),
                page: page,
                size: size
            };
            if (prevSize.current !== size && size === undefined) {
                return;
            }
            try {
                const data = await getBands(params);
                console.log("data is", data);
                if (data && !Array.isArray(data.data)) {
                    if (data.data) {
                        setBands([data.data]);
                    } else {
                        setBands([]);
                    }
                    
                } else {
                    setBands(data.data);
                }

                if (data) {
                    setPage(data.currentPage);
                    setSize(data.size);
                    setTotalPages(data.totalPages);
                    console.log("data is ", data);
                    console.log("set page is ", data.currentPage);
                    console.log("total pages is ", data.totalPages);
                }
            } catch (err) {
                toast.error(`${err}`);
            }
            getAllGenres()
            .then((data) => {
                setGenres(data);
            })
            .catch((err) => {
                toast.error(`${err}`);
            })
        };
    
        // Check which value changed
        if (prevSortOrder.current !== sortOrder) {
            console.log('Sort order changed');
        }
        if (prevPage.current !== page) {
            console.log('Page changed');
        }
        if (prevSize.current !== size) {
            console.log('Size changed');
        }
        if (prevFilters.current !== filters) {
            console.log('Filters changed');
        }

        console.log("Page now is", page);
        // Trigger fetchBands only when the values change
        fetchBands();
    
        // Update the previous values after the effect runs
        prevSortOrder.current = sortOrder;
        prevPage.current = page;
        prevSize.current = size;
        prevFilters.current = filters;
    }, [sortOrder, page, size, filters, canFetch]); // Dependencies to trigger the effect
    
    return (
        <SortContext.Provider value={{ sortOrder, setSortOrder }}>
            <PaginationContext.Provider value={{ page, setPage, size, setSize, totalPages, setTotalPages }}>
                <FilterContext.Provider value={{ filters, setFilters }}>
                    <BandsContext.Provider value={{ canFetch, setCanFetch }}>
                        <GenresContext.Provider value={{ genres, setGenres }}>
                            <Toaster position="bottom-right" reverseOrder={false} />
                            <div className={styles.page}>
                                <div className={styles.header}>
                                    <h1 className={styles.title}>Bands</h1>
                                    <div className={styles.controls}>
                                        <PaginationSize />
                                        <Button style='secondary' size='m' onClick={() => setFiltersModalVisible(!isFiltersModalVisible)}>
                                            <FilterIcon className={styles.icon} />
                                            Filter
                                        </Button>
                                        {isFiltersModalVisible && <Filters onClose={() => setFiltersModalVisible(false)} />}
                                        <Button style='primary' size='l' onClick={() => { setAddBandModalVisible(true) }}>
                                            <PlusIcon className={`${styles.icon} ${styles.inverted}`} />
                                            Create new band
                                        </Button>
                                    </div>
                                </div>
                                <Table bands={bands} />
                                <SpecialActions />
                            </div>
                            {isAddBandModalVisible &&
                                <AddBandModal isVisible={isAddBandModalVisible} onClose={() => setAddBandModalVisible(false)} />
                            }
                        </GenresContext.Provider>
                    </BandsContext.Provider>
                </FilterContext.Provider>
            </PaginationContext.Provider>
        </SortContext.Provider>
    );
}
