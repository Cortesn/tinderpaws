import React, { useState } from "react";

const Homepage = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Welcome to the Homepage</h1>
      <p>Number of Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click!</button>
      <button onClick={() => setCount(count + 2)}>Click Click!</button>
		</>
	);
};

export default Homepage;
