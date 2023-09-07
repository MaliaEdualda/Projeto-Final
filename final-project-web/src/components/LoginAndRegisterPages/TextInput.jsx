import { useState, } from 'react';

export function TextInput({ type = 'text', label, register, errors, name, constraints }) {
    const [filled, setFilled] = useState();

    return (
        <div className="input-container">
            <input type={type} onClick={() => setFilled(true)}
                {...register(name, constraints)} />
            {errors[name] && <p> {errors[name].message}</p>}
            <label className={filled && 'filled'} htmlFor={'name'}>
                {label}
            </label>
        </div>
    );
}