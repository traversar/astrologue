import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <>
            <Link to='/chart/'>Chart</Link>
            <Link to='/transits/'>Transits</Link>
            <Link to='/compatibility/'>Compatibility</Link>
            <Link to='/learn/'>Learn</Link>
        </>
    )
}

const NavbarContainer = () => {

    return <Navbar />
}

export default NavbarContainer
