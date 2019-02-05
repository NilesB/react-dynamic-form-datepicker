import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

const FormDatePicker = ({ name, placeholder, value, valid, onChange, dayPickerProps, dayPickerInputProps }) => {
    const onInternalChange = date => {
        const event = document.createEvent('Event');
        const value = date;

        event.initEvent('onChange', true, true);
        window.dispatchEvent(event);

        Object.defineProperty(event, 'target', {
            writable: false,
            value: {
                value,
                name,
            },
        });

        Object.defineProperty(event, 'persist', {
            writable: false,
            value: () => null,
        });

        onChange(event);
    };

    const className = classNames([
        'DayPickerInput rdf-input',
        {
            'input-invalid': !valid,
            'input-valid': valid,
        },
    ]);

    return (
        <DayPickerInput
            onDayChange={onInternalChange}
            placeholder={placeholder}
            dayPickerProps={dayPickerProps}
            value={value}
            inputProps={{
                className,
            }}
            formatDate={formatDate}
            parseDate={parseDate}
            {...dayPickerInputProps}
        />
    );
};

FormDatePicker.defaultProps = {
    name: 'date',
    placeholder: 'Select a date',
    value: null,
    valid: true,
    onChange: () => null,
    dayPickerProps: {},
    dayPickerInputProps: {},
};

FormDatePicker.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    valid: PropTypes.bool,
    onChange: PropTypes.func,
    dayPickerProps: PropTypes.object,
    dayPickerInputProps: PropTypes.object,
};

export { FormDatePicker as default };