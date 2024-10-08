'use client'

import styles from './styles.module.css';
import {TableCell} from "@/app/components/TableCell";
import {Properties} from "@/app/types/properties";

export const TableHeader = () => {
    return (
        <>
            <div className={`table-grid ${styles.container}`}>
                <TableCell withSort cellKey={Properties.ID}>
                    ID
                </TableCell>
                <TableCell withSort cellKey={Properties.NAME}>
                    Name
                </TableCell>
                <TableCell withSort cellKey={Properties.DESCRIPTION}>
                    Description
                </TableCell>
                <TableCell withSort cellKey={Properties.CREATION_DATE}>
                    Creation date
                </TableCell>
                <TableCell withSort cellKey={Properties.COORDINATE_X}>
                    X
                </TableCell>
                <TableCell withSort cellKey={Properties.COORDINATE_Y}>
                    Y
                </TableCell>
                <TableCell withSort cellKey={Properties.NUMBER_OF_PARTICIPANTS}>
                    Members
                </TableCell>
                <TableCell withSort cellKey={Properties.GENRE}>
                    Genre
                </TableCell>
                <TableCell withSort cellKey={Properties.PERSON_NAME}>
                    Frontman's name
                </TableCell>
                <TableCell>
                    Singles
                </TableCell>
                <TableCell>
                    Actions
                </TableCell>
            </div>
            <div className='divider'></div>
        </>
    )
}