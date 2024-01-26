import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
		mutationFn: (bookingId) => deleteBookingApi(bookingId),
		onSuccess: () => {
			toast.success(`Booking successfully deleted`);

			queryClient.invalidateQueries({ queryKey: ["bookings"] });
		},
		onError: () => toast.error("Error when trying to delete booking"),
	});

	return {
		isDeletingBooking,
		deleteBooking,
	};
}
