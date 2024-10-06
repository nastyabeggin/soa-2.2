'use client'

import styles from './styles.module.css';
import {TableCell} from "@/app/components/TableCell";
import {SortKeys} from "@/app/types/sort";

export const TableHeader = () => {
    return (
        <>
            <div className={`table-grid ${styles.container}`}>
                <TableCell withSort cellKey={SortKeys.NAME}>
                    ID
                </TableCell>
                <TableCell withSort cellKey={SortKeys.NAME}>
                    Name
                </TableCell>
                <TableCell withSort cellKey={SortKeys.DESCRIPTION}>
                    Description
                </TableCell>
                <TableCell withSort cellKey={SortKeys.CREATION_DATE}>
                    Creation date
                </TableCell>
                <TableCell withSort cellKey={SortKeys.X}>
                    X
                </TableCell>
                <TableCell withSort cellKey={SortKeys.Y}>
                    Y
                </TableCell>
                <TableCell withSort cellKey={SortKeys.MEMBERS}>
                    Members
                </TableCell>
                <TableCell withSort cellKey={SortKeys.GENRE}>
                    Genre
                </TableCell>
                <TableCell withSort cellKey={SortKeys.FRONTMAN}>
                    Frontman's name
                </TableCell>
                <TableCell withSort cellKey={SortKeys.SINGLE}>
                    Singles
                </TableCell>
            </div>
            <div className='divider'></div>
        </>
    )
}