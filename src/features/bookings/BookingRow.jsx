import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function BookingRow({
	booking: {
		id: bookingId,
		start_date,
		end_date,
		num_nights,
		total_price,
		status,
		guests: { full_name: guestName, email },
		cabins: { name: cabinName },
	},
}) {
	const navigate = useNavigate();
	const { checkout } = useCheckout();
	const { deleteBooking } = useDeleteBooking();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(start_date))
						? "Today"
						: formatDistanceFromNow(start_date)}{" "}
					&rarr; {num_nights} night stay
				</span>
				<span>
					{format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(end_date), "MMM dd yyyy")}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(total_price)}</Amount>
			<Menus>
				<Menus.Toggle id={bookingId} />
				<Modal>
					<Menus.List id={bookingId}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${bookingId}`)}
						>
							See Details
						</Menus.Button>
						{status === "unconfirmed" && (
							<Menus.Button
								icon={<HiArrowDownOnSquare />}
								onClick={() => navigate(`/checkin/${bookingId}`)}
							>
								Check in
							</Menus.Button>
						)}
						{status === "checked-in" && (
							<Menus.Button
								icon={<HiArrowUpOnSquare />}
								onClick={() => {
									checkout(bookingId);
								}}
							>
								Check out
							</Menus.Button>
						)}
						<Modal.Open openId="deleteBooking">
							<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>
					<Modal.Window name="deleteBooking">
						<ConfirmDelete
							resourceName="booking"
							onConfirm={() => deleteBooking(bookingId)}
						/>
					</Modal.Window>
				</Modal>
			</Menus>
		</Table.Row>
	);
}

export default BookingRow;
