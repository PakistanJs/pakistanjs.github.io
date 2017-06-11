import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class List extends Component {
	renderRows(items) {
		const rows = items.map(item => {
			const cleanItem = Object.assign({}, item)
			return (
				<Table.Row onClick={() => this.props.onItemSelect(cleanItem)}>
					<Table.Cell>
						{JSON.stringify(cleanItem)}
					</Table.Cell>
				</Table.Row>
			)
		})

		return rows
	}

	render() {
		const { items } = this.props
		return (
			<Table basic='very' celled collapsing>
				{items.length}
				<Table.Body>
					{this.renderRows(items)}
				</Table.Body>
			</Table>
		)
	}
}

export default List
