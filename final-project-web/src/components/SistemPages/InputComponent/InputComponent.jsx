import React from 'react';

export function InputComponent({ type = 'text', label, register, errors, name, constraints }) {
    return (
        <div className="input-component">
            <label>{label}</label>
            <input type={type}
                {...register(name, constraints)} />
            {errors[name] && <p> {errors[name].message}</p>}
        </div>
    );
}