import React from 'react'
import PropTypes from 'prop-types'
import { GridLoader } from 'react-spinners'
import { Box } from 'gestalt'

const Loader =({ show }) => {
    return (
        (show) && (
            <Box position="fixed" dangerouslySetInlineStyle={{
                __style: {
                    bottom: 300,
                    left: '50%',
                    transform: 'translateX(-50%)'
                }
            }}>
                <GridLoader color="darkorange" size={15} margin="3px"/>
            </Box>
        )
    )
}

Loader.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default Loader
