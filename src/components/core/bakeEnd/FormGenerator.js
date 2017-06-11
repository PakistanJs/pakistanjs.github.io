import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import customFetch from 'utils/customFetch'

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

class FormGenerator extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillReceiveProps(props) {
		if (props.defaultValues && props.defaultValues.id) {
			console.log(props.defaultValues)
			this.setState({ ...props.defaultValues })
		}
	}

	handleOnSubmit = (e) => {
		e.preventDefault()
		const { fields, onSubmit } = this.props
		const values = fields.reduce((result, { name }) => {
			result[name] = e.target[name].value
			return result
		}, {})
		onSubmit({...values, ...this.state})
	}

	handleImageUpload = ({ target }) => {
		const { name, files } = target
		const formData = new FormData()
		formData.append('file', files.item(0))
		customFetch('/api/upload', {
				method: 'POST',
				body: formData
			})
			.then((image) => {
				this.setState({
					[name]: image
				})
			})
	}

	getFieldComponent = (field) => {
		const { defaultValues } = this.props
		const label = capitalizeFirstLetter(field.name)
		const value = this.state[field.name]

		if (field.type === 'String') {
			return (
				<Form.Input
					label={label}
					name={field.name}
					type='text'
					value={value}
					onChange={(e, o) => this.setState({ [field.name]: o.value })}
				/>
			)
		}

		if (field.type === 'ImageInput') {
			const img = this.state[field.name]
			return (
				<Form.Field>
					<label>{label}</label>
					<div>
						<input type="file" name={field.name} onChange={this.handleImageUpload} />
						{img ? <img src={`http://res.cloudinary.com/pakistanjs-com/image/upload/w_250,h_200,c_fit/${img.public_id}`} /> : null}
					</div>
				</Form.Field>
			)
		}
	}

	render() {
		const { fields } = this.props
		return (
			<Form onSubmit={this.handleOnSubmit}>
				{fields.map(this.getFieldComponent)}
				<Button type='submit'>Add/Edit</Button>
			</Form>
		)
	}
}

export default FormGenerator
