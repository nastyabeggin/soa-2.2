'use client'

import styles from "./page.module.css";
import {bandsList} from "@/app/mocks/bands";
import {Table} from "@/app/components/Table";
import {DEFAULT_SORT_ORDER, SortContext, SortOrderMap} from "@/app/context/sort";
import {useState} from "react";

export default function Home() {
    const [sortOrder, setSortOrder] = useState<SortOrderMap>(DEFAULT_SORT_ORDER);

    return (
        <SortContext.Provider value={{sortOrder, setSortOrder}}>
            <div className={styles.page}>
                <div>
                    <h1 className={styles.title}>Bands</h1>
                </div>
                <Table bands={bandsList}/>
            </div>
        </SortContext.Provider>
    );
}
