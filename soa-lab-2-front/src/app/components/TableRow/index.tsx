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
                <div className='table-grid'>
                    <TableCell className={styles.title}>
                        {band.name}
                    </TableCell>
                    <TableCell>
                        {band.description}
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
                        {band.frontMan && band.frontMan.name}
                    </TableCell>
                    <TableCell>
                        {band.singles && 'singles'}
                    </TableCell>
                </div>
                <div className='divider'></div>
        </>
    )
}