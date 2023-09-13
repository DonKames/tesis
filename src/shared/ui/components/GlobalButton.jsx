import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/globalStyles.css';

export const GlobalButton = ({ label, onClick, color }) => {
    return (
        <button className={`global-button ${color}`} onClick={onClick}>
            {label}
        </button>
    );
};

GlobalButton.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
};
