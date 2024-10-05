import styles from './styles.module.css';
import {PropsWithChildren} from "react";
import {Band} from "@/app/types/bands";
import {TableRow} from "@/app/components/TableRow";
import {TableHeader} from "@/app/components/TableHeader";

type TableProps = {
    bands: Band[];
}

export const Table = ({ children, bands }: PropsWithChildren<TableProps>) => {
    return (
        <div className={styles.table}>
            <TableHeader />
            {bands.map((band) => {
                return (
                    <TableRow key={band.id} band={band}/>
                )
            })}
        </div>
    )
}