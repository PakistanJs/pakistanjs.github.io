import React, { Component } from 'react'
import styles from './AddEdit.css'
import { Button, Modal } from 'semantic-ui-react'
import customFetch from 'utils/customFetch'

import FormGenerator from './FormGenerator'
import List from './List'

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

class AddEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onItemSelect = (item) => {
		this.setState({ selectedItem: item })
	}

	render() {
		const {
			title,
			items,
			fields,
			onSubmit
		} = this.props

		return(
			<Modal trigger={<Button className={styles.floatingButton}>{title}</Button>}>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Content>
					<List
						items={items}
						onItemSelect={this.onItemSelect}
					/>
					<FormGenerator
						fields={fields}
						onSubmit={onSubmit}
						defaultValues={this.state.selectedItem}
					/>
				</Modal.Content>
			</Modal>
		)
	}
}

export default AddEdit
