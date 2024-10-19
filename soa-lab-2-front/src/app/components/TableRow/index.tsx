'use client'

import styles from './styles.module.css';
import {Band} from "@/app/types/bands";
import {format} from 'date-fns';
import {TableCell} from "@/app/components/TableCell";
import {DeleteIcon, EditIcon} from "@/static/icons";
import {useState} from "react";
import {DeleteBandModal} from "@/app/components/DeleteBandModal";
import {UpdateBandModal} from "@/app/components/UpdateBandModal";

type TableRowProps = {
    band: Band;
}

export const TableRow = ({ band }: TableRowProps) => {
    const [isDeleteBandModalVisible, setDeleteBandModalVisible] = useState<boolean>(false);
    const [isUpdateBandModalVisible, setUpdateBandModalVisible] = useState<boolean>(false);

    return (
        <>
                <div className='table-grid'>
                    <TableCell>
                        #{band.id}
                    </TableCell>
                    <TableCell className={styles.title}>
                        {band.name}
                    </TableCell>
                    <TableCell>
                        {band.singlesCount}
                    </TableCell>
                    <TableCell>
                        {format(band.creationDate, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                        {band.coordinates.x.toFixed(2)}
                    </TableCell>
                    <TableCell>
                        {band.coordinates.y.toFixed(2)}
                    </TableCell>
                    <TableCell>
                        {band.numberOfParticipants}
                    </TableCell>
                    <TableCell>
                        {band.genre}
                    </TableCell>
                    <TableCell>
                        {band.studio.name ? band.studio.name : '–'}
                    </TableCell>
                    <TableCell>
                        <EditIcon className={`${styles.icon} ${styles.action}`} onClick={() => setUpdateBandModalVisible(true)}/>
                        <DeleteIcon className={`${styles.icon} ${styles.action} ${styles.danger}`} onClick={() => setDeleteBandModalVisible(true)}/>
                    </TableCell>
                </div>
                <div className='divider'></div>
            {isDeleteBandModalVisible &&
                <DeleteBandModal bandId={band.id} bandName={band.name} isVisible={isDeleteBandModalVisible} onClose={() => setDeleteBandModalVisible(false)}/>
            }
            {isUpdateBandModalVisible &&
                <UpdateBandModal band={band} isVisible={isUpdateBandModalVisible} onClose={() => setUpdateBandModalVisible(false)}/>
            }
        </>
    )
}