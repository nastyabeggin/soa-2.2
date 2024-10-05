import styles from './styles.module.css';
import {Band} from "@/app/types/bands";
import {format} from 'date-fns';
import {TableCell} from "@/app/components/TableCell";
import {SortKeys} from "@/app/types/sort";

type TableRowProps = {
    band: Band;
}

export const TableRow = ({ band }: TableRowProps) => {
    return (
        <>
                <div className={styles.container}>
                    <TableCell className={`${styles.title} title`} cellKey={SortKeys.NAME}>
                        {band.name}
                    </TableCell>
                    <TableCell className='textProperty' cellKey={SortKeys.DESCRIPTION}>
                        {band.description}
                    </TableCell>
                    <TableCell className='property' cellKey={SortKeys.CREATION_DATE}>
                        {format(band.creationDate, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className='shortProperty' cellKey={SortKeys.X}>
                        {band.coordinates.x.toFixed(2)}
                    </TableCell>
                    <TableCell className='shortProperty' cellKey={SortKeys.Y}>
                        {band.coordinates.y.toFixed(2)}
                    </TableCell>
                    <TableCell className='shortProperty' cellKey={SortKeys.MEMBERS}>
                        {band.numberOfParticipants}
                    </TableCell>
                    <TableCell className='property' cellKey={SortKeys.GENRE}>
                        {band.genre}
                    </TableCell>
                    <TableCell className='textProperty' cellKey={SortKeys.FRONTMAN}>
                        {band.frontMan && band.frontMan.name}
                    </TableCell>
                    <TableCell className='property' cellKey={SortKeys.SINGLE}>
                        {band.singles && 'singles'}
                    </TableCell>
                </div>
                <div className={styles.divider}></div>
        </>
    )
}