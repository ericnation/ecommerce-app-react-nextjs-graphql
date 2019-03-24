import React, { Component } from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApollowConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import gql from 'graphql-tag';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
			id
			image
			title
		}
	}
`;

class AutoComplete extends React.Component {
	render() {
		return (
			<SearchStyles>
				<div>
					<ApollowConsumer>
						{client => (
              <input type="search" onChange={() => console.log(client)} />
            )}
					</ApollowConsumer>

					<DropDown>
						<p>Itmes will go here</p>
					</DropDown>
				</div>
			</SearchStyles>
		);
	}
}

export default AutoComplete;
