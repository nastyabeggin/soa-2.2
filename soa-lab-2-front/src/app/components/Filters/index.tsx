import styles from './styles.module.css';
import {FiltersItem} from "@/app/components/FiltersItem";
import {Button} from "@/app/components/Button";
import {Property} from "@/app/types/property";

type FiltersProps = {
    onClose: () => void
}

export const Filters = ({ onClose }: FiltersProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Filters</h2>
            <FiltersItem property={Property.ID} propertyTitle='ID'/>
            <FiltersItem property={Property.NAME} propertyTitle='Name'/>
            <FiltersItem property={Property.DESCRIPTION} propertyTitle='Description'/>
            <FiltersItem property={Property.COORDINATE_X} propertyTitle='Coordinate X'/>
            <FiltersItem property={Property.COORDINATE_Y} propertyTitle='Coordinate Y'/>
            <FiltersItem property={Property.CREATION_DATE} propertyTitle='Creation date'/>
            <FiltersItem property={Property.NUMBER_OF_PARTICIPANTS} propertyTitle='Number of members'/>
            <FiltersItem property={Property.GENRE} propertyTitle='Genre'/>
            <FiltersItem property={Property.PERSON_NAME} propertyTitle='Front Man name'/>
            <div className='buttons'>
                <Button style='cancel' size='m' onClick={onClose}>
                    Cancel
                </Button>
                <Button style='primary' size='m'>
                    Find
                </Button>
            </div>
        </div>
    )
}