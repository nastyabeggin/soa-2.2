'use client'

import styles from './styles.module.css';
import {TableCell} from "@/app/components/TableCell";
import {Property} from "@/app/types/property";

export const TableHeader = () => {
    return (
        <>
            <div className={`table-grid ${styles.container}`}>
                <TableCell withSort cellKey={Property.ID}>
                    ID
                </TableCell>
                <TableCell withSort cellKey={Property.NAME}>
                    Name
                </TableCell>
                <TableCell withSort cellKey={Property.SINGLES_COUNT}>
                    Singles count
                </TableCell>
                <TableCell withSort cellKey={Property.CREATION_DATE}>
                    Creation date (UTC+0)
                </TableCell>
                <TableCell withSort cellKey={Property.COORDINATE_X}>
                    X
                </TableCell>
                <TableCell withSort cellKey={Property.COORDINATE_Y}>
                    Y
                </TableCell>
                <TableCell withSort cellKey={Property.NUMBER_OF_PARTICIPANTS}>
                    Members
                </TableCell>
                <TableCell withSort cellKey={Property.GENRE}>
                    Genre
                </TableCell>
                <TableCell withSort cellKey={Property.STUDIO_NAME}>
                    {"Studio name"}
                </TableCell>
                <TableCell>
                    Actions
                </TableCell>
            </div>
            <div className='divider'></div>
        </>
    )
}