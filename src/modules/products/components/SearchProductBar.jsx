import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { searchProducts } from '../actions/productActions';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // searchProducts(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default connect(null)(SearchBar);
