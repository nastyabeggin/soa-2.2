import {PROPERTIES_LIST, PROPERTIES_TEXT, Property} from "@/app/types/property";
import {FILTER_LIST, FILTER_TEXT, FilterType} from "@/app/types/filter";
import {ChangeEvent, PropsWithChildren, useContext, useState} from "react";
import {FilterContext} from "@/app/context/filter";
import styles from './styles.module.css';

type FiltersItemProps = {
    property: Property;
    validate: {
        min?: number;
        minLength?: number;
        step?: number;
        type: 'number' | 'text';
    }
}

export const FiltersItem = ({ property, validate: { min, minLength, type, step } }: FiltersItemProps) => {
    const [operator, setOperator] = useState<FilterType>(FilterType.EQ);
    const [value, setValue] = useState<string>();

    const { filters, setFilters } = useContext(FilterContext);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setFilters({
            ...filters,
            [property]: {
                operator: operator,
                value: e.target.value
            }
        });
        console.log(filters);
    }

    const onOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setOperator(e.target.value as FilterType);
        setFilters({
            ...filters,
            [property]: {
                operator: e.target.value as FilterType,
                value: value
            }
        });
        console.log(filters);
    }

    return (
        <div className={styles.container}>
            {PROPERTIES_TEXT[property]}
            <select className='select' defaultValue={FilterType.EQ} onChange={onOperatorChange}>
                {FILTER_LIST.map((filter) => {
                    return (
                        <option key={filter} value={filter}>{FILTER_TEXT[filter]}</option>
                    )
                })}
            </select>
            <input type={type} min={min} minLength={minLength} step={step} className='input' defaultValue='' onChange={onValueChange} placeholder='Type something...'/>
        </div>
    )
}