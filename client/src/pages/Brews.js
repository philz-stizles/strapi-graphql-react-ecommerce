import React, { Component } from 'react';
import Loader from './../components/Loader';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Image, Card, Button, Mask } from 'gestalt';
import { Link } from 'react-router-dom';

const baseURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(baseURL);

class Brews extends Component {
    state = {
        brand: {
            name: '',
            brews: []
        },
        loadingBrand: true,
        cart: []
    }

    async componentDidMount() {
        const { match } = this.props;
        try {
            const { data } = await strapi.request("POST", "/graphql", {
                data: {
                query: `query {
                    brand(id: "${match.params.brandId}") {
                        id
                        name
                        brews {
                            id
                            name
                            description
                            price
                            image {
                                url
                            }
                        }
                    }
                }
                `
                }
            });

            console.log(data);

            this.setState({ 
                brand: {
                    name: data.brand.name,
                    brews: data.brand.brews
                }, 
                loadingBrand: false 
            });
        } catch (error) {
            console.error(error);
            this.setState({ loadingBrands: false });
        }
    }

    render() {
        const { brand: { name, brews }, loadingBrand, cart } = this.state;
        if(loadingBrand) {
            return <Loader show={loadingBrand} />
        }

        return (
            <Box marginTop={4} display="flex" justifyContent="center" alignItems="start">
                <Box display="flex" direction="column" alignItems="center">
                    <Box margin={2}>
                        <Heading color="orchid">{name}</Heading>
                    </Box>
                    <Box dangerouslySetInlineStyle={{
                        __style: {
                            backgroundColor: '#bdcdd9'
                        }
                    }} wrap shape="rounded" display="flex" justifyContent="center" padding={4}>
                        {
                            brews.map(({ _id, name, description, price,  image }) => (
                                <Box paddingY={4} margin={2} width={210} key={_id}>
                                    <Card image={
                                        <Box height={250} width={200}>
                                            <Image fit="cover" alt={name} naturalHeight={1} naturalWidth={1} src={`${baseURL}${image[0].url}`} />
                                        </Box>
                                    }>  
                                        <Box display="flex" direction="column" justifyContent="center" alignItems="center">
                                            <Box marginBottom={2}>
                                                <Text bold size="lg">{name}</Text>
                                            </Box>
                                            <Text>{description}</Text>
                                            <Text color="orchid">${price}</Text>
                                            <Box marginTop={2}>
                                                <Text bold size="lg">
                                                    <Button color="blue" text="Add to Cart" />
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Card>
                                    </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Box marginTop={2} marginLeft={8}>
                    <Mask shape="rounded" wash>
                        <Box display="flex" direction="column" alignItems="center" padding={2}>
                            <Heading align="center" size="md">Your Cart</Heading>
                            <Text> {cart.length} </Text>
                        </Box>
                    </Mask>
                </Box>
            </Box>
        )
    }
}

export default Brews