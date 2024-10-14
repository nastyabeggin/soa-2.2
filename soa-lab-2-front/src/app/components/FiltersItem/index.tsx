'use client'

import {PROPERTIES_LIST, PROPERTIES_TEXT, Property} from "@/app/types/property";
import {FILTER_LIST, FILTER_TEXT, FilterType} from "@/app/types/filter";
import {ChangeEvent, PropsWithChildren, useContext, useEffect, useState} from "react";
import {FilterContext} from "@/app/context/filter";
import styles from './styles.module.css';
import toast from "react-hot-toast";

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
    const { filters, setFilters } = useContext(FilterContext);

    const [operator, setOperator] = useState<FilterType>(filters[property].operator ?? FilterType.EQ);
    const [value, setValue] = useState<string | undefined>(filters[property].value);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setFilters({
            ...filters,
            [property]: {
                operator: operator,
                value: e.target.value
            }
        });
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
    }

    return (
        <div className={styles.container}>
            {PROPERTIES_TEXT[property]}
            <select className='select' defaultValue={operator} onChange={onOperatorChange}>
                {FILTER_LIST.map((filter) => {
                    return (
                        <option key={filter} value={filter}>{FILTER_TEXT[filter]}</option>
                    )
                })}
            </select>
            <input type={type} min={min} minLength={minLength} step={step} className='input' value={value ?? ''} onChange={onValueChange} placeholder='Type something...'/>
        </div>
    )
}