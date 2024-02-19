export default function FormRowSelect({
	name,
	labelText,
	list,
	onChange,
	defaultValue = '',
}) {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<select
				onChange={onChange}
				name={name}
				id={name}
				className='form-select'
				defaultValue={defaultValue}
			>
				{list.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
}
