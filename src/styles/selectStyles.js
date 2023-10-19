/* eslint-disable indent */
export const errorStyle = {
    control: (provided, state) => ({
        ...provided,
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
};
/* eslint-enable indent */
