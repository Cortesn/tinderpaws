const pets = [
	{
		name: "Skippy",
		type: "dog",
		breed: "Russell Terrier",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget condimentum lorem. Etiam et scelerisque urna, id auctor dolor. Sed feugiat ex ut nibh maximus, eget dapibus libero pellentesque. In in sapien venenatis, vulputate libero in, egestas ante. Donec tellus nisl, vehicula sit amet elit sit amet, aliquet aliquet odio. Aenean pharetra dictum enim in hendrerit. Praesent blandit fringilla porta. Aliquam erat volutpat. Nullam eget arcu ex. Aenean laoreet consequat ex, posuere porttitor dolor ultricies at. Nullam id mattis tellus, viverra sodales lectus. Sed lacinia velit id maximus pharetra. Phasellus volutpat justo arcu, nec tempus metus euismod quis.",
		shelter: "Happy Shelter",
		images: [
			"https://images.dog.ceo/breeds/terrier-russell/iguet1.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet2.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet3.jpeg",
			"https://images.dog.ceo/breeds/terrier-russell/iguet4.jpeg",
		],
	},
	{
		name: "Toto",
		type: "dog",
		breed: "Cairn Terrier",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget condimentum lorem. Etiam et scelerisque urna, id auctor dolor. Sed feugiat ex ut nibh maximus, eget dapibus libero pellentesque. In in sapien venenatis, vulputate libero in, egestas ante. Donec tellus nisl, vehicula sit amet elit sit amet, aliquet aliquet odio. Aenean pharetra dictum enim in hendrerit. Praesent blandit fringilla porta. Aliquam erat volutpat. Nullam eget arcu ex. Aenean laoreet consequat ex, posuere porttitor dolor ultricies at. Nullam id mattis tellus, viverra sodales lectus. Sed lacinia velit id maximus pharetra. Phasellus volutpat justo arcu, nec tempus metus euismod quis.",
		shelter: "Happy Shelter",
		images: [
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_1518.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_2703.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_342.jpg",
			"https://images.dog.ceo/breeds/terrier-cairn/n02096177_6700.jpg",
		],
	},
	{
		name: "Wilson",
		type: "Fox",
		breed: "Red Fox",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget condimentum lorem. Etiam et scelerisque urna, id auctor dolor. Sed feugiat ex ut nibh maximus, eget dapibus libero pellentesque. In in sapien venenatis, vulputate libero in, egestas ante. Donec tellus nisl, vehicula sit amet elit sit amet, aliquet aliquet odio. Aenean pharetra dictum enim in hendrerit. Praesent blandit fringilla porta. Aliquam erat volutpat. Nullam eget arcu ex. Aenean laoreet consequat ex, posuere porttitor dolor ultricies at. Nullam id mattis tellus, viverra sodales lectus. Sed lacinia velit id maximus pharetra. Phasellus volutpat justo arcu, nec tempus metus euismod quis.",
		shelter: "Foxy Shelter",
		images: [
			"https://randomfox.ca/images/68.jpg",
			"https://randomfox.ca/images/91.jpg",
			"https://randomfox.ca/images/119.jpg",
			"https://randomfox.ca/images/6.jpg",
		],
	},
	{
		name: "Bonnie Beans",
		type: "dog",
		breed: "Australian Cattle Dog",
		description:
			"Bonnie is a loving, joyful, and super adventurous puppy! She loves hiking, jogging, going to the beach, and swimming. She’s the ideal pup to go on adventures and road trips! She's very social with other dogs and people and doesn’t suffer from any phobias besides a little bit of separation anxiety. Housebroken and crate trained, loves the dog park. Needs adequate space for zoomies, ideally access to a yard. She'd be great in home with another dog and children (not babies or elderly though).",
		shelter: "Get Your Pet",
		images: [
			"https://getyourpet.com/photos/60c899ff-5df6-482b-bb65-a2cedaea6844/pet-photo-565987.png",
			"https://getyourpet.com/photos/60c899ff-5df6-482b-bb65-a2cedaea6844/pet-photo-565986.png",
			"https://getyourpet.com/photos/60c899ff-5df6-482b-bb65-a2cedaea6844/pet-photo-565985.png",
		],
	},
];

const randomAnimal = () => {
	return pets[Math.floor(Math.random() * pets.length)];
};

export {pets, randomAnimal};