import React from 'react'
import PropTypes from 'prop-types'
import { Box, Toast as Toastr } from 'gestalt';

const Toast = ({ show, message }) => {
    return (
        show && (
            <Box dangerouslySetInlineStyle={{
                __style: {
                    bottom: 100,
                    left: '50%',
                    transform: 'translateX(-50%)'
                }
            }} position="fixed">
                <Toastr color="red" text={message} />
            </Box>
        )
    )
}

Toast.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
}

export default Toast
