export default function FormRow({
	type,
	name,
	labelText,
	onChange,
	defaultValue = '',
}) {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<input
				onChange={onChange}
				type={type}
				id={name}
				name={name}
				className='form-input'
				defaultValue={defaultValue}
				required
			/>
		</div>
	);
}
