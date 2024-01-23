import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
	const {
		isLoading,
		error,
		settings: {
			min_booking_length,
			max_guest_per_booking,
			max_booking_length,
			breakfast_price,
		} = {},
	} = useSettings();
	const { isUpdating, updateSettings } = useUpdateSettings();

	const handleUpdate = (e, field) => {
		const { value } = e.target;

		if (!value) return;
		updateSettings({ [field]: value });
	};

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					disabled={isUpdating}
					defaultValue={min_booking_length}
					onBlur={(e) => handleUpdate(e, "min_booking_length")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={max_booking_length}
					onBlur={(e) => handleUpdate(e, "max_booking_length")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={max_guest_per_booking}
					onBlur={(e) => handleUpdate(e, "max_guest_per_booking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfast_price}
					onBlur={(e) => handleUpdate(e, "breakfast_price")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
