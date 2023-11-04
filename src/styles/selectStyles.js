/* eslint-disable indent */
export const errorStyle = {
    control: (provided, state) => ({
        ...provided,
        height: '58px',

        borderColor: state.isFocused
            ? '#ddd'
            : state.selectProps.isInvalid
            ? 'red'
            : '#ddd',
        boxShadow: state.isFocused
            ? null
            : state.selectProps.isInvalid
            ? '0 0 5px red'
            : null,
        '&:hover': {
            borderColor: state.isFocused
                ? '#ddd'
                : state.selectProps.isInvalid
                ? 'red'
                : '#ddd',
        },
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: '10px',
        marginTop: '10px',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

/* eslint-enable indent */
