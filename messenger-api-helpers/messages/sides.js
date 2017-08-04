const sides = [
	{
		title: "Fries",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty, on a sesame bun.",
	},
	{
		title: "Poutine",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese, on a sesame bun.",
	},

	{
		title: "Cheesy Fries",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with bacon, on a sesame bun.",
	},

	{
		title: "Milkshake",
		image_url: "http://i.imgur.com/6PnW8EE.jpg",
		subtitle: "One beef patty with cheese and bacon, on a sesame bun.",
	},

]


const findSide = function(name) {
  return [...sides]
    .filter(x => {
      return x.title === name;
    })
    .pop();
};

module.exports = { sides, findSide };