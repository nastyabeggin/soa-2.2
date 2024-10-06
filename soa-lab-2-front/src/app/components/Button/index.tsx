import {PropsWithChildren} from "react";

type ButtonProps = {
    onClick?: () => void;
    style: 'primary' | 'secondary' | 'accent' | 'accent-green' | 'cancel';
    size: 's' | 'm' | 'l';
}

export const Button = ({ onClick, children, style, size }: PropsWithChildren<ButtonProps>) => {
    return (
        <div
            onClick={onClick}
            className={`button ${style} ${size}`}
        >
            {children}
        </div>
    )
}