import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
      $title: String!
      $description: String!
      $price: Int!
      $image: String
      $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;


class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }

  handleChange = (e) => {
    // Destructure that ish
    const { name, type, value } = e.target;
    // if number make sure its a number
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    })
  }

  uploadFile = async e => {
    console.log('uploading file ... ');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/ericnation/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, { loading, error }) => (
          <Form onSubmit={async (e) => {
            // Stop form from submitting
            e.preventDefault();
            // call the mutation
            const res = await createItem();
            // route them to single item page
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
              <input
                  type="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (<img src={this.state.image} width="200" alt="Upload Preview"/>) }
              </label>

              <label htmlFor="title">
                Title
              <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.props.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="price">
                Price
              <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.props.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
              <textarea
                  name="description"
                  placeholder="Enter a Description"
                  required
                  value={this.props.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
      )}

      </Mutation>

    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };