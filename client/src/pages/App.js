import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, Container, Heading, Icon, Image, SearchField, Text } from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
import './App.css';
import Loader from './../components/Loader';

const baseURL = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(baseURL);

class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true
  }

  handleChange = ({value}) => this.setState({ searchTerm: value})

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
              brands {
                _id
                name
                description
                updatedAt
                image {
                  url
                  name
                }
              }
            }
          `
        }
      });

      console.log(data);

      this.setState({ brands: data.brands, loadingBrands: false });
    } catch (error) {
      console.error(error);
      this.setState({ loadingBrands: false });
    }
  }

  searchFilter = (searchTerm, items) => {
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        || item.name.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

  render() {
    const { brands, searchTerm, loadingBrands } = this.state;

    return (
      <Container>
        {/* Brands Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField" 
            name="searchTerm" 
            accessibilityLabel="Brands Search Field" 
            onChange={this.handleChange} 
            placeholder="Search Brands" />
            <Box margin={3}><Icon icon="filter" color={(searchTerm) ? 'orange' : 'gray'} size={20} accessibilityLabel="Filter" /></Box>
        </Box>

        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">Brew Brands</Heading>
        </Box>

        {/* Brands */}
        <Box dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: '#d6c8ec'
          }
        }} shape="rounded" wrap display="flex" justifyContent="around">
          {
            this.searchFilter(searchTerm, brands).map(({ _id, name, image, description }) => {
              return (
                <Box paddingY={4} margin={2} width={200} key={_id}>
                  <Card image={
                    <Box height={200} width={200}>
                        <Image fit="cover" alt={name} naturalHeight={1} naturalWidth={1} src={`${baseURL}${image[0].url}`} />
                    </Box>
                  }>  
                    <Box display="flex" direction="column" justifyContent="center" alignItems="center">
                      <Text bold size="lg">{name}</Text>
                      <Text>{description}</Text>
                      <Text bold size="lg">
                        <Link to={`/${_id}`}>See Brews</Link>
                      </Text>
                    </Box>
                  </Card>
                </Box>
              )
            })
          }
        </Box>
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" /> */}
        <Loader show={loadingBrands} />
      </Container>
    )
  }
}

export default App;
