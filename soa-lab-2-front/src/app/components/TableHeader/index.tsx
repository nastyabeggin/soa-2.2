'use client'

import styles from './styles.module.css';
import {TableCell} from "@/app/components/TableCell";
import {SortKeys} from "@/app/types/sort";

export const TableHeader = () => {
    return (
        <>
            <div className={styles.container}>
                <TableCell className='title' withSort cellKey={SortKeys.NAME}>
                    Name
                </TableCell>
                <TableCell className='textProperty' withSort cellKey={SortKeys.DESCRIPTION}>
                    Description
                </TableCell>
                <TableCell className='property' withSort cellKey={SortKeys.CREATION_DATE}>
                    Creation date
                </TableCell>
                <TableCell className='shortProperty' withSort cellKey={SortKeys.X}>
                    X
                </TableCell>
                <TableCell className='shortProperty' withSort cellKey={SortKeys.Y}>
                    Y
                </TableCell>
                <TableCell className='shortProperty' withSort cellKey={SortKeys.MEMBERS}>
                    Members
                </TableCell>
                <TableCell className='property' withSort cellKey={SortKeys.GENRE}>
                    Genre
                </TableCell>
                <TableCell className='textProperty' withSort cellKey={SortKeys.FRONTMAN}>
                    Frontman's name
                </TableCell>
                <TableCell className='property' withSort cellKey={SortKeys.SINGLE}>
                    Singles
                </TableCell>
            </div>
            <div className={styles.divider}></div>
        </>
    )
}