import React, { Component } from 'react';
import { Container, Box, Heading, Text, TextField, Button } from 'gestalt'
import Toast from '../components/Toast';

class Signup extends Component {
    state = {
        timer: null,
        signupForm: {
            username: '',
            email: '',
            password: ''
        },
        toast: {
            show: false,
            message: ''
        }
    }

    handleChange = ({event, value}) => {
        event.persist();
        this.setState({ signupForm: {
            ...this.signupForm,
            [event.target.name]: value
        } })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(event);
        const { signupForm } = this.state;
        if(this.isFormEmpty(signupForm)) {
            this.showToast('Fill required fields');
        }
    }

    showToast = message => {

        const timer = setTimeout(() => {
            this.setState({
                timer: null,
                toast: {
                    ...this.state.toast,
                    show: false,
                    message: ''
                }
            });
        }, 3000);

        this.setState({
            timer,
            toast: {
                ...this.state.toast,
                show: true,
                message
            }
        });
    }

    isFormEmpty = (username, email, password) => {
        return !username || !email || !password;
    }

    componentWillUnmount () {
        clearTimeout(this.state.timer);
    }

    render() {
        const {toast} = this.state;
        return (
            <Container>
                <Box
                    dangerouslySetInlineStyle={{
                        __style: {
                            backgroundColor: '#ebe2da',
                            marginTop: '10rem'
                        }
                    }}
                    margin={4}
                    padding={4}
                    shape="rounded"
                    display="flex"
                    justifyContent="center"
                >
                    <form onSubmit={this.handleSubmit} style={{
                        display: 'inline-block',
                        textAlign: 'center',
                        maxWidth: 450
                    }}>
                        <Box
                            marginBottom={2}
                            display="flex"
                            direction="column"
                            alignItems="center">
                            <Heading color="midnight">Let's get started</Heading>
                            <Text italic color="orchid">Sign up to order some brews</Text>
                        </Box>

                        <TextField id="username" name="username" type="text" onChange={this.handleChange} placeholder="Username"/>
                        <TextField id="email" name="email" type="email" onChange={this.handleChange} placeholder="Email"/>
                        <TextField id="password" name="password" type="password" onChange={this.handleChange} placeholder="Password"/>
                        <Button inline color="blue" text="Submit" type="submit"/>

                    </form>
                </Box>
                <Toast {...toast} />
            </Container>
        )
    }
}

export default Signup
