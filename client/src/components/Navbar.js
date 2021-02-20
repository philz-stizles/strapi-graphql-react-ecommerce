import React from 'react'
import { NavLink } from 'react-router-dom';
import { Box, Heading, Text, Image } from 'gestalt'

const Navbar = props => {
    return (
        <Box display="flex" alignItems="center" justifyContent="between" height={70} color="navy" padding={1} >
            <NavLink to="/signin" activeClassName="active">
                <Text size="lg" color="white">Sign In</Text>
            </NavLink>

            <NavLink exact to="/" activeClassName="active">
                <Box display="flex" alignItems="center">
                    <Box margin={2} height={50} width={50}>
                        <Image alt="BrewHaha Logo  " naturalHeight={1} naturalWidth={1} src="./icons/logo.svg" />
                    </Box>
                    <Heading size="sm" color="orange">BrewHaha</Heading>
                </Box>
            </NavLink>

            <NavLink to="/signup" activeClassName="active">
                <Text size="lg" color="white">Sign Up</Text>
            </NavLink>
        </Box>
    )
}

export default Navbar
