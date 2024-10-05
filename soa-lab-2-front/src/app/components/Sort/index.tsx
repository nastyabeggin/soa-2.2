'use client'

import styles from './styles.module.css';
import SortIcon from '@/static/icons/sort-amount-up.svg';
import {useContext} from "react";
import {SortContext, transitionSortOrder} from "@/app/context/sort";
import {SortKeys, SortOrder} from "@/app/types/sort";

type SortProps = {
    sortKey: SortKeys;
}

export const Sort = ({ sortKey }: SortProps) => {
    const { sortOrder, setSortOrder} = useContext(SortContext);
    const className = sortOrder[sortKey] === SortOrder.ASC ? styles.asc : (sortOrder[sortKey] === SortOrder.DESC ? styles.desc : '');

    function onClick() {
        setSortOrder({
            ...sortOrder,
            [sortKey]: transitionSortOrder(sortOrder[sortKey])
        });
    }

    return (
        <div className={styles.container} onClick={onClick}>
            <SortIcon className={`${styles.sort} ${className}`}/>
        </div>
    )
}