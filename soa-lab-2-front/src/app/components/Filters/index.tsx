import styles from './styles.module.css';
import {FiltersItem} from "@/app/components/FiltersItem";
import {Button} from "@/app/components/Button";
import {Property} from "@/app/types/property";
import {useContext, useEffect} from "react";
import {BandsContext} from "@/app/context/bands";
import {DEFAULT_FILTERS, FilterContext} from "@/app/context/filter";
import toast from "react-hot-toast";

type FiltersProps = {
    onClose: () => void
}

export const Filters = ({ onClose }: FiltersProps) => {
    const { canFetch, setCanFetch } = useContext(BandsContext);
    const { setFilters } = useContext(FilterContext);

    function onSubmit() {
        setCanFetch(canFetch + 1);
    }

    function onResetClick() {
        setFilters(DEFAULT_FILTERS);
        setCanFetch(canFetch + 1);
        onClose();
    }

    return (
        <form className={styles.container} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.title}>
                Filters
                <Button style='danger' size='s' onClick={onResetClick}>
                    Reset
                </Button>
            </h2>
            <FiltersItem property={Property.ID} validate={{type: 'number', min: 1}}/>
            <FiltersItem property={Property.NAME} validate={{type: 'text', minLength: 1}}/>
            <FiltersItem property={Property.DESCRIPTION} validate={{type: 'text'}}/>
            <FiltersItem property={Property.COORDINATE_X} validate={{type: 'number', step: 1}}/>
            <FiltersItem property={Property.COORDINATE_Y} validate={{type: 'number', min: -439}}/>
            <FiltersItem property={Property.CREATION_DATE} validate={{type: 'text'}}/>
            <FiltersItem property={Property.NUMBER_OF_PARTICIPANTS} validate={{type: 'number', min: 1, step: 1}}/>
            <FiltersItem property={Property.GENRE} validate={{type: 'text'}}/>
            <FiltersItem property={Property.PERSON_NAME} validate={{type: 'text', minLength: 1}}/>
            <div className='buttons'>
                <Button style='cancel' size='m' onClick={onClose}>
                    Cancel
                </Button>
                <Button style='primary' size='m' submit onClick={onSubmit}>
                    Find
                </Button>
            </div>
        </form>
    )
}