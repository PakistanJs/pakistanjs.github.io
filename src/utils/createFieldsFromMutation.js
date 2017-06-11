const createFieldsFromMutation = (mutation) => {
	if (!mutation || !mutation.definitions) return;

	if (mutation.definitions.length === 1) {
		const def = mutation.definitions[0]
		const fields = def.variableDefinitions.map(d => {
			return {
				type: d.type.type.name.value,
				name: d.variable.name.value
			}
		})

		return fields
	}
}

export default createFieldsFromMutation
