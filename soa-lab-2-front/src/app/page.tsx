'use client'

import styles from "./page.module.css";
import {BANDS_LIST_MOCK} from "@/app/mocks/bands";
import {Table} from "@/app/components/Table";
import {DEFAULT_SORT_ORDER, SortContext, SortOrderMap} from "@/app/context/sort";
import {useState} from "react";
import {Button} from "@/app/components/Button";
import {FilterIcon, PlusIcon} from "@/static/icons";
import {AddBandModal} from "@/app/components/AddBandModal";
import {SpecialActions} from "@/app/components/SpecialActions";
import {DEFAULT_PAGE, DEFAULT_SIZE, PaginationContext} from "@/app/context/pagination";
import {PaginationSize} from "@/app/components/PaginationSize";
import {DEFAULT_FILTERS, Filter, FilterContext, FilterMap} from "@/app/context/filter";
import {Filters} from "@/app/components/Filters";

export default function Home() {
    const [sortOrder, setSortOrder] = useState<SortOrderMap>(DEFAULT_SORT_ORDER);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [size, setSize] = useState<number>(DEFAULT_SIZE);
    const [filters, setFilters] = useState<FilterMap>(DEFAULT_FILTERS);

    const [isAddBandModalVisible, setAddBandModalVisible] = useState<boolean>(false);
    const [isFiltersModalVisible, setFiltersModalVisible] = useState<boolean>(false);

    return (
        <SortContext.Provider value={{sortOrder, setSortOrder}}>
            <PaginationContext.Provider value={{page, setPage, size, setSize}}>
                <FilterContext.Provider value={{filters, setFilters}}>
                    <div className={styles.page}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Bands</h1>
                            <div className={styles.controls}>
                                <PaginationSize />
                                <Button style='secondary' size='m' onClick={() => setFiltersModalVisible(!isFiltersModalVisible)}>
                                    <FilterIcon className={styles.icon}/>
                                    Filter
                                </Button>
                                {isFiltersModalVisible && <Filters onClose={() => setFiltersModalVisible(false)}/>}
                                <Button style='primary' size='l' onClick={() => {setAddBandModalVisible(true)}}>
                                    <PlusIcon className={`${styles.icon} ${styles.inverted}`}/>
                                    Create new band
                                </Button>
                            </div>
                        </div>
                        <Table bands={BANDS_LIST_MOCK}/>
                        <SpecialActions />
                    </div>
                    {isAddBandModalVisible &&
                        <AddBandModal isVisible={isAddBandModalVisible} onClose={() => setAddBandModalVisible(false)}/>
                    }
                </FilterContext.Provider>
            </PaginationContext.Provider>
        </SortContext.Provider>
    );
}
