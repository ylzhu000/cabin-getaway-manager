import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error("Cabins could not be loaded");
		throw new Error("Error when trying to access cabins database");
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	// Ensure unique image url and remove / to ensure supabase won't create a folder
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);

	// Use existing image path for updating
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	const payload = {
		name: newCabin.name,
		max_capacity: newCabin.maxCapacity,
		regular_price: newCabin.regularPrice,
		discount: newCabin.discount,
		description: newCabin.discount,
		image: imagePath,
	};

	let query = supabase.from("cabins");
	// Add a new cabin
	if (!id) {
		query = query.insert([payload]);
	} else {
		// Update an existing cabin
		query = query.update({ ...payload }).eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error("Cabins could not be loaded");
		throw new Error("Error when trying to create a cabin");
	}

	// Aviod upload image again if alreay existed
	if (hasImagePath) return data;

	const { error: imageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// Remove cabin if error occured after image upload
	if (imageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		throw Error(
			"Cabin image could not be uploaded therefore cabin is not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error, data } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		throw new Error("Error when trying to delete a cabin");
	}

	return data;
}
