/*
Querying Trees:

Sometimes, in addition to flat arrays, we need to query trees. Trees pose a challenge because we need to flatten them into arrays in order to apply filter() and map() operations on them. In this section we'll define a concatAll() function that we can combine with map() and filter() to query trees.

Exercise 9: Flatten the movieLists array into an array of video ids

Let's start by using two nested forEach loops to collect the id of every video in the two-dimensional movieLists array.
*/

function queryingTrees() {
	var movieLists = [
		{
			name: "New Releases",
			videos: [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		},
		{
			name: "Dramas",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		}
	],
	allVideoIdsInMovieLists = [];

	// ------------   INSERT CODE HERE!  -----------------------------------
	// Use two nested forEach loops to flatten the movieLists into a list of
	// video ids.
	movieLists.forEach((list) => {
		list.videos.forEach((movie) => {
			allVideoIdsInMovieLists.push(movie.id);
		});
	});
	// ------------   INSERT CODE HERE!  -----------------------------------

	return allVideoIdsInMovieLists;

}
// -----------------------------------------------------------------------------
/*
Flattening trees with nested forEach expressions is easy because we can explicitly add items to the array. Unfortunately it's exactly this type of low-level operation that we've been trying to abstract away with functions like map() and filter(). Can we define a function that's abstract enough to express our intent to flatten a tree, without specifying too much information about how to carry out the operation?

Exercise 10: Implement concatAll()

Let's add a concatAll() function to the Array type. The concatAll() function iterates over each sub-array in the array and collects the results in a new, flat array. Notice that the concatAll() function expects each item in the array to be another array.
*/

Array.prototype.concatAll = function() {
	var results = [];
	this.forEach((subArray) => {
		// ------------ INSERT CODE HERE! ----------------------------
		// Add all the items in each subArray to the results array.
		results = results.concat(subArray);
		// ------------ INSERT CODE HERE! ----------------------------
	});

	return results;
};

// JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]"
// [1,2,3].concatAll(); // throws an error because this is a one-dimensional array
// console.log([[1,2,3],[4,5,6],[7,8,9]].concatAll());


// -----------------------------------------------------------------------------
/*
concatAll is a very simple function, so much so that it may not be obvious yet how it can be combined with map() to query a tree. Let's try an example...

Exercise 11: Use map() and concatAll() to project and flatten the movieLists into an array of video ids

Hint: use two nested calls to map() and one call to concatAll().
*/
function exc11() {
	var movieLists = [
		{
			name: "New Releases",
			videos: [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		},
		{
			name: "Dramas",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
					"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		}
	];

	// ------------   INSERT CODE HERE!  -----------------------------------
	// Use map and concatAll to flatten the movieLists in a list of video ids.
	movieLists = movieLists
	.map((list) => list.videos.map((video) => video.id))
	.concatAll();
	// ------------   INSERT CODE HERE!  -----------------------------------

	return movieLists // Complete this expression!
}
// console.log(exc11());

// -----------------------------------------------------------------------------
/*
Wow! Great work. Mastering the combination of map() and concatAll() is key to effective functional programming. You're half way there! Let's try a more complicated example...

Exercise 12: Retrieve id, title, and a 150x200 box art url for every video

You've managed to flatten a tree that's two levels deep, let's try for three! Let's say that instead of a single boxart url on each video, we had a collection of boxart objects, each with a different size and url.

>>> Create a query that selects {id, title, boxart} for every video in the movieLists.

This time though, the boxart property in the result will be the >>> url of the boxart object with dimensions of 150x200px.

Let's see if you can solve this problem with map(), concatAll(), and filter().

There's just more one thing: you can't use indexers. In other words, this is illegal:

var itemInArray = movieLists[0];

Furthermore, you're not allowed to use indexers in any of the remaining exercises unless you're implementing one of the five functions. There is a very good reason for this restriction, and that reason will eventually be explained. For now, you'll simply have to accept it on faith that this restriction serves a purpose. :-)
*/
function exc12() {
	var movieLists = [
		{
			name: "Instant Queue",
			videos : [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxarts": [
						{
							width: 150,
							height: 200,
							url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
						},
						{
							width: 200,
							height: 200,
							url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
						}
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxarts": [
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		},
		{
			name: "New Releases",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxarts": [
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxarts": [
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
						{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		}
	];

	movieLists = movieLists
	.map((list) =>
	list.videos
	.map((video) =>
	({ id: video.id, title: video.title, boxart: video.boxarts })
)
)
.concatAll()
.map((video) => {
	let newBoxArt = '';

	video.boxart
	.filter((art) =>  (art.height === 200 && art.width === 150))
	.map((attr) => { newBoxArt = attr.url; })

	video.boxart = newBoxArt;
	return video;
});

// Use one or more map, concatAll, and filter calls to create an array with the following items
/*
[
{
"id": 675465,
"title": "Fracture",
"boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
}, {
"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
{"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
{"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
];
*/

return movieLists // Complete this expression!

}
// console.log(exc12());
// -----------------------------------------------------------------------------
/*
Fantastic job! Now you've learned to use concatAll() alongside map() and filter() to query trees. Notice that map() and concatAll() are very commonly chained together. Let's create a small helper function to help us with this common pattern.

Exercise 13: Implement concatMap()

Nearly every time we flatten a tree we chain map() and concatAll(). Sometimes, if we're dealing with a tree several levels deep, we'll repeat this combination many times in our code. To save on typing, let's create a concatMap function that's just a map operation, followed by a concatAll.
*/

Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
	return this.map((item) => {
		// "this" is referencing the array the concat map was called on.
		// Apply the projection function to each item. The projection
		// function will return a new child array. This will create a
		// two-dimensional array.
		return projectionFunctionThatReturnsArray(item);
		// apply the concatAll function to flatten the two-dimensional array
	})
	.concatAll();
};

/*
var spanishFrenchEnglishWords = [
["cero","rien","zero"],
["uno","un","one"],
["dos","deux","two"]
];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0,1,2].concatMap((index) => spanishFrenchEnglishWords[index]);

return JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]';
*/
var spanishFrenchEnglishWords = [ ["cero","rien","zero"], ["uno","un","one"], ["dos","deux","two"] ];
// console.log([0,1,2].concatMap((index) => spanishFrenchEnglishWords[index]));
// -----------------------------------------------------------------------------
/*
Now, instead of using map().concatAll() to flatten a tree, we can just use concatMap helper function.

Exercise 14: Use concatMap() to retrieve id, title, and 150x200 box art url for every video

Let's repeat the exercise we just performed. However this time we'll simplify the code by replacing the map().concatAll() calls with concatMap().
*/
function exc14() {
	var movieLists = [
		{
			name: "Instant Queue",
			videos : [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxarts": [
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxarts": [
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		},
		{
			name: "New Releases",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxarts": [
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxarts": [
						{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
						{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
						{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id: 432534, time: 65876586 }]
				}
			]
		}
	];
	// My Initial Answer
	// return movieLists.concatMap(({ videos }) =>
	// 	videos.map(({ id, title, boxarts }) =>
	// 		({
	// 			id,
	// 			title,
	// 			boxart: boxarts,
	// 		})
	// 	))
	// 	.map((video) => {
	// 		let newBoxArt = ''
	// 		video.boxart = video.boxart
	// 		.filter(({ width, height }) => (width === 150 && height === 200))
	// 		.map(({ url }) => {
	// 			newBoxArt = url;
	// 		})
	// 		video.boxart = newBoxArt;
	// 		return video;
	// 	});

	/*
	Their Answer
	- Something that was not clear to me with before studying their answer was thinking of concatMap as a pattern that takes a nested data structure from an inner layer, and moves it to an outter layer.  The map is there to be the iterator, but the concat is there to actually do the moving between layers.  So in the future, when you need to move a nested data structure to an upper level, this would be the patter.  Everything else in their answer, is simply there to manipulate the data that we'll eventually move...nothing else.
	*/

	return movieLists.concatMap(({ videos }) =>
	videos.concatMap((video) =>
	video.boxarts.filter(({ width }) => width === 150)
	.map((boxart) =>
	({ id: video.id, title: video.title, boxart: boxart.url })
)
)
);
// movieLists = movieLists.concatMap(function(movieList) {
//
// 	let newMovieList = movieList.videos.concatMap(function(video) {
//
// 		let newVideo = video.boxarts
// 		.filter(function(boxart) {
// 			return boxart.width === 150;
// 		})
// 		.map(function(boxart) {
// 			return {id: video.id, title: video.title, boxart: boxart.url};
// 		});
// 		// console.log('newVideo: ', newVideo);
// 		return newVideo
// 	});
// 	console.log('newMovieList: ', newMovieList);
// 	return newMovieList;
// });
// console.log('movieLists: ', movieLists);

// Use one or more concatMap, map, and filter calls to create an array with the following items
// [
//	 {"id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
//	 {"id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
//	 {"id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
//	 {"id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
// ];

return movieLists // Complete this expression!

}
// console.log(exc14());
// exc14();
// -----------------------------------------------------------------------------
/*
It's a very common pattern to see several nested concatMap operations, with the last operation being a map. You can think of this pattern as the functional version of a nested forEach.

Reducing Arrays
Sometimes we need to perform an operation on more than one item in the array at the same time. For example, let's say we need to find the largest integer in an array. We can't use a filter() operation, because it only examines one item at a time. To find the largest integer we need to compare items in the array to each other.

One approach could be to select an item in the array as the assumed largest number (perhaps the first item), and then compare that value to every other item in the array. Each time we come across a number that was larger than our assumed largest number, we'd replace it with the larger value, and continue the process until the entire array was traversed.

If we replaced the specific size comparison with a closure, we could write a function that handled the array traversal process for us. At each step our function would apply the closure to the last value and the current value and use the result as the last value the next time. Finally we'd be left with only one value. This process is known as reducing because we reduce many values to a single value.

Exercise 15: Use forEach to find the largest box art

In this example we use forEach to find the largest box art. Each time we examine a new boxart we update a variable with the currently known maximumSize. If the boxart is smaller than the maximum size, we discard it. If it's larger, we keep track of it. Finally we're left with a single boxart which must necessarily be the largest.
*/
function exc15() {
	var boxarts = [
		{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
		{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
		{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
		{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
	],
	currentSize,
	maxSize = -1,
	largestBoxart;

	boxarts.forEach(({ width, height, url }) => {
		currentSize = width * height;
		if (currentSize > maxSize) {
			maxSize = currentSize;
			largestBoxart = { width, height, url };
		}
	})

	return largestBoxart;
}
// console.log(exc15());
// -----------------------------------------------------------------------------
/*
This process is a reduction because we're using the information we derived from the last computation to calculate the current value. However in the example above, we still have to specify the method of traversal. Wouldn't it be nice if we could just specify what operation we wanted to perform on the last and current value? Let's create a helper function to perform reductions on arrays.

Exercise 16: Implement reduce()

Let's add a reduce() function to the Array type. Like map. Take note this is different from the reduce in ES5, which returns a value instead of an Array!
*/
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }); === [6];
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10); === [16];

Array.prototype.reduce = function(combiner, initialValue) {
	var counter,
	accumulatedValue;

	// If the array is empty, do nothing
	if (this.length === 0) return this;

	// If the user didn't pass an initial value, use the first item.
	if (arguments.length === 1) {
		counter = 1;
		accumulatedValue = this[0];
	} else if (arguments.length >= 2) {
		counter = 0;
		accumulatedValue = initialValue;
	} else {
		throw "Invalid arguments.";
	}

	// Loop through the array, feeding the current value and the result of
	// the previous computation back into the combiner function until
	// we've exhausted the entire array and are left with only one value.
	while(counter < this.length) {
		accumulatedValue = combiner(accumulatedValue, this[counter])
		counter++;
	}

	return [accumulatedValue];
};

// -----------------------------------------------------------------------------
/*
This process is a reduction because we're using the information we derived from the last computation to calculate the current value. However in the example above, we still have to specify the method of traversal. Wouldn't it be nice if we could just specify what operation we wanted to perform on the last and current value? Let's create a helper function to perform reductions on arrays.

Exercise 16: Implement reduce()

Let's add a reduce() function to the Array type. Like map. Take note this is different from the reduce in ES5, which returns a value instead of an Array!
*/
function exc17() {
	var ratings = [2,3,1,4,5];

	// You should return an array containing only the largest rating. Remember that reduce always
	// returns an array with one item.
	return ratings
	.reduce((acc, value) => acc > value ? acc : value);
}
// console.log(exc17());
// -----------------------------------------------------------------------------
/*
Nice work. Now let's try combining reduce() with our other functions to build more complex queries.

Exercise 18: Retrieve url of the largest boxart

Let's try combining reduce() with map() to reduce multiple boxart objects to a single value: the url of the largest box art.
*/
function exc18() {
	var boxarts = [
		{ width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
		{ width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
		{ width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
		{ width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
	];

	// You should return an array containing only the URL of the largest box art. Remember that reduce always returns an array with one item.
	return boxarts
	.reduce((acc, value) =>
	(acc.width * acc.height) > (value.width * value.height) ? acc : value)
	.map(({ url }) => url);
}
// console.log(exc18());
// -----------------------------------------------------------------------------
/*
Exercise 19: Reducing with an initial value

Sometimes when we reduce an array, we want the reduced value to be a different type than the items stored in the array. Let's say we have an array of videos and we want to reduce them to a single map where the key is the video id and the value is the video's title.
*/
function exc19() {
	var videos = [
		{
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"id": 675465,
			"title": "Fracture"
		},
		{
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"id": 654356453,
			"title": "Bad Boys"
		}
	];

	// Expecting this output...
	// [
	//	 {
	//		 "65432445": "The Chamber",
	//		 "675465": "Fracture",
	//		 "70111470": "Die Hard",
	//		 "654356453": "Bad Boys"
	//	 }
	// ]
	return videos.reduce((accumulatedMap, video) => {
		var obj = {};

		// ----- INSERT CODE TO ADD THE VIDEO TITLE TO THE ----
		obj[video.id] = video.title;
		// ----- NEW MAP USING THE VIDEO ID AS THE KEY	 ----

		// Object.assign() takes all of the enumerable properties from
		// the object listed in its second argument (obj) and assigns them
		// to the object listed in its first argument (accumulatedMap).
		return Object.assign(accumulatedMap, obj);
	},
	// Use an empty map as the initial value instead of the first item in
	// the list.
	{});
}
// console.log(exc19());
// -----------------------------------------------------------------------------
/*
Nice work. Now let's try combining reduce() with our other functions to build more complex queries.

Exercise 20: Retrieve the id, title, and smallest box art url for every video.

This is a variation of the problem we solved earlier, where we retrieved the url of the boxart with a width of 150px. This time we'll use reduce() instead of filter() to retrieve the smallest box art in the boxarts array.
*/
function exc20() {
	var movieLists = [
		{
			name: "New Releases",
			videos: [
				{
					"id": 70111470,
					"title": "Die Hard",
					"boxarts": [
						{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 654356453,
					"title": "Bad Boys",
					"boxarts": [
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
						{ width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		},
		{
			name: "Thrillers",
			videos: [
				{
					"id": 65432445,
					"title": "The Chamber",
					"boxarts": [
						{ width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 4.0,
					"bookmark": []
				},
				{
					"id": 675465,
					"title": "Fracture",
					"boxarts": [
						{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
						{ width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
						{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
					],
					"url": "http://api.netflix.com/catalog/titles/movies/70111470",
					"rating": 5.0,
					"bookmark": [{ id:432534, time:65876586 }]
				}
			]
		}
	];


	// Use one or more concatMap, map, and reduce calls to create an array with the following items (order doesn't matter)
	// [
	//	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
	//	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
	//	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
	//	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
	// ];

	//[{ videos: [{ boxarts: [{ url, width, height }] }] }, { videos: [] }]
	return movieLists.concatMap((movieList) =>
	movieList.videos.concatMap((video) =>
	video.boxarts.reduce((first, boxart) => {
		if ((boxart.width * boxart.height) < (first.width * first.height)) {
			return boxart;
		}
		return first;
	})
	.map(({ url }) => ({ id: video.id, title: video.title, boxart: url }))
)
)
}
// console.log('excercise 20: \n', exc20());
// -----------------------------------------------------------------------------
/*
Zipping Arrays
Sometimes we need to combine two arrays by progressively taking an item from each and combining the pair. If you visualize a zipper, where each side is an array, and each tooth is an item, you'll have a good idea of how the zip operation works.

Exercise 21: Combine videos and bookmarks by index

Use a for loop to traverse the videos and bookmarks array at the same time. For each video and bookmark pair, create a {videoId, bookmarkId} pair and add it to the videoIdAndBookmarkIdPairs array.
*/
function exc21() {
	var videos = [
		{
			"id": 70111470,
			"title": "Die Hard",
			"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 4.0,
		},
		{
			"id": 654356453,
			"title": "Bad Boys",
			"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 5.0,
		},
		{
			"id": 65432445,
			"title": "The Chamber",
			"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 4.0,
		},
		{
			"id": 675465,
			"title": "Fracture",
			"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
			"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
			"rating": 5.0,
		}
	],
	bookmarks = [
		{id: 470, time: 23432},
		{id: 453, time: 234324},
		{id: 445, time: 987834}
	],
	counter,
	videoIdAndBookmarkIdPairs = [];

	for(
		counter = 0;
		counter < Math.min(videos.length, bookmarks.length);
		counter++) {
			videoIdAndBookmarkIdPairs[counter] = {
				videoId: videos[counter].id,
				bookmarkId: bookmarks[counter].id
			}
		}

		return videoIdAndBookmarkIdPairs;
	}
	// console.log(exc21());
	// -----------------------------------------------------------------------------
	/*
	Exercise 22: Implement zip

	Let's add a static zip() function to the Array type. The zip function accepts a combiner function, traverses each array at the same time, and calls the combiner function on the current item on the left-hand-side and right-hand-side. The zip function requires an item from each array in order to call the combiner function, therefore the array returned by zip will only be as large as the smallest input array.
	*/
	Array.zip = (left, right, combinerFunction) => {
		let counter;
		let results = [];

		for (
			counter = 0;
			counter < Math.min(left.length, right.length);
			counter++
		) {
			results[counter] = combinerFunction(left[counter], right[counter]);
		}
		return results;
	}
	// console.log('exc22: \n', Array.zip([1,2,3],[4,5,6], (left, right) => (left + right)))
	/* Output
	exc22:
	[ 5, 7, 9 ]
	*/
	// -----------------------------------------------------------------------------
	/*
	Exercise 23: Combine videos and bookmarks by index

	Let's repeat exercise 21, but this time lets use your new zip() function. For each video and bookmark pair, create a {videoId, bookmarkId} pair.
	*/
	function exc23() {
		var videos = [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
			},
			{
				"id": 65432445,
				"title": "The Chamber",
				"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
			},
			{
				"id": 675465,
				"title": "Fracture",
				"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
			}
		],
		bookmarks = [
			{id: 470, time: 23432},
			{id: 453, time: 234324},
			{id: 445, time: 987834}
		];

		return Array.zip(videos, bookmarks, (video, bookmark) =>
		({ videoId: video.id, bookmarkId: bookmark.id }))
	}
	// console.log(exc23());
	// -----------------------------------------------------------------------------
	/*
	Exercise 24: Retrieve each video's 1) id, 2)title, 3)middle interesting moment time, and 4) smallest box art url.

	This is a variation of the problem we solved earlier.

	This time each video has an interesting moments collection, each representing a time during which a screenshot is interesting or representative of the title as a whole.

	Notice that both the boxarts and interestingMoments arrays are located at the same depth in the tree. Meaning, use zip here!

	Retrieve the time of the middle interesting moment and the smallest box art url simultaneously with zip(). Return an {id, title, time, url} object for each video.
	*/
	function exc24() {
		var movieLists = [
			{
				name: "New Releases",
				videos: [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxarts": [
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"interestingMoments": [
							{ type: "End", time:213432 },
							{ type: "Start", time: 64534 },
							{ type: "Middle", time: 323133}
						]
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
							{ width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"interestingMoments": [
							{ type: "End", time:54654754 },
							{ type: "Start", time: 43524243 },
							{ type: "Middle", time: 6575665}
						]
					}
				]
			},
			{
				name: "Instant Queue",
				videos: [
					{
						"id": 65432445,
						"title": "The Chamber",
						"boxarts": [
							{ width: 130, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"interestingMoments": [
							{ type: "End", time:132423 },
							{ type: "Start", time: 54637425 },
							{ type: "Middle", time: 3452343}
						]
					},
					{
						"id": 675465,
						"title": "Fracture",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
							{ width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
							{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"interestingMoments": [
							{ type: "End", time:45632456 },
							{ type: "Start", time: 234534 },
							{ type: "Middle", time: 3453434}
						]
					}
				]
			}
		];

		//------------ COMPLETE THIS EXPRESSION --------------
		//------------ My Answer --------------
		return movieLists
		.concatMap((movieList) =>
		movieList.videos
		.concatMap((video) => {
			let boxarts = video.boxarts.reduce((first, next) => {
				if((first.width * first.height) < (next.width * next.height)) {
					return first;
				} else {
					return next;
				}
			});
			let moments = video.interestingMoments.filter(({ type }) => type === "Middle");
			return Array.zip(boxarts, moments, ({ url }, { time }) => ({
				id: video.id,
				title: video.title,
				time,
				url,
			})
		);
	})
);
//------------ Their Answer --------------
// return movieLists
// 	.concatMap((movieList) => movieList.videos
// 		.concatMap((video) =>
// 			Array.zip(
// 				video.boxarts.reduce((acc,curr) => {
// 					if (acc.width * acc.height < curr.width * curr.height) {
// 				  	  	return acc;
// 					} else {
// 				  		return curr;
// 					}
// 		  	}),
// 				video.interestingMoments.filter((interestingMoment) =>
// 					interestingMoment.type === "Middle"),
// 			  	({ url }, { time }) => ({
// 						id: video.id,
// 						title: video.title,
// 						time,
// 						url
// 				});
// 	  	);
// 		);
// 	);
}
// console.log(exc24());
// -----------------------------------------------------------------------------
/*
Powerful Queries
Now that we've learned the five operators let's flex our muscles and write some powerful queries.

Exercise 25: Converting from Arrays to Trees

When information is organized in a tree like a JSON expression, relationships point from parent to child. In relational systems like databases, relationships point from children to their parents. Both ways of organizing information are equivalent, and depending on the circumstances, we might get data organized in one way or another. It may surprise you to learn that you can use the 5 query functions you already know to easily convert between these representations. In other words, not only can you query arrays from trees, you can query trees from arrays.

We have 2 arrays each containing lists, and videos respectively. Each video has a listId field indicating its parent list. We want to build an array of list objects, each with a name and a videos array. The videos array will contain the video's id and title. In other words we want to build the following structure:


*/
function exc25() {
	var lists = [
		{
			"id": 5434364,
			"name": "New Releases"
		},
		{
			"id": 65456475,
			"name": "Thrillers"
		}
	],
	videos = [
		{
			"listId": 5434364,
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"listId": 5434364,
			"id": 675465,
			"title": "Fracture"
		},
		{
			"listId": 65456475,
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"listId": 65456475,
			"id": 654356453,
			"title": "Bad Boys"
		}
	];
	// My Answer
	return lists.map((list) => {
		list.videos = videos.filter((video) => {
			if (video.listId !== list.id) return false;
			delete video.listId;
			return true;
		});
		delete list.id;
		return list;
	});

	// Their Answer
	// 1) Whenever you see that you're potentially deleting a property on every object, consider using a map and only returning keys that you desire.
	return lists.map(({ name, id }) => ({
		name,
		videos: videos
		.filter(({ listId }) => listId === id)
		.map(({ id, title }) => ({ id, title }))
	})
);
}
// console.log(exc25());
// -----------------------------------------------------------------------------
/*
Looks like you figured out that you can use map and filter to join two different arrays by a key. Now let's try a more complex example...

Exercise 26: Converting from Arrays to Deeper Trees

Let's try creating a deeper tree structure. This time we have 4 separate arrays each containing lists, videos, boxarts, and bookmarks respectively. Each object has a parent id, indicating its parent. We want to build an array of list objects, each with a name and a videos array. The videos array will contain the video's id, title, bookmark time, and smallest boxart url. In other words we want to build the following structure:

[
{
"name": "New Releases",
"videos": [
{
"id": 65432445,
"title": "The Chamber",
"time": 32432,
"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
},
{
"id": 675465,
"title": "Fracture",
"time": 3534543,
"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
}
]
},
{
"name": "Thrillers",
"videos": [
{
"id": 70111470,
"title": "Die Hard",
"time": 645243,
"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
},
{
"id": 654356453,
"title": "Bad Boys",
"time": 984934,
"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
}
]
}
]
*/
function exc26() {
	var lists = [
		{
			"id": 5434364,
			"name": "New Releases"
		},
		{
			"id": 65456475,
			name: "Thrillers"
		}
	],
	videos = [
		{
			"listId": 5434364,
			"id": 65432445,
			"title": "The Chamber"
		},
		{
			"listId": 5434364,
			"id": 675465,
			"title": "Fracture"
		},
		{
			"listId": 65456475,
			"id": 70111470,
			"title": "Die Hard"
		},
		{
			"listId": 65456475,
			"id": 654356453,
			"title": "Bad Boys"
		}
	],
	boxarts = [
		{
			videoId: 65432445,
			width: 130,
			height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
		},
		{ videoId: 65432445, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" },
		{ videoId: 675465, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
		{ videoId: 675465, width: 120, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
		{ videoId: 675465, width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
		{ videoId: 70111470, width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
		{ videoId: 70111470, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" },
		{ videoId: 654356453, width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
		{ videoId: 654356453, width: 140, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }
	],
	bookmarks = [
		{ videoId: 65432445, time: 32432 },
		{ videoId: 675465, time: 3534543 },
		{ videoId: 70111470, time: 645243 },
		{ videoId: 654356453, time: 984934 }
	];

	return lists.map(({ id, name }) => ({
		name,
		videos: videos
		.filter(({ listId }) => listId === id)
		.concatMap((video) =>
		Array.zip(
			bookmarks
			.filter(({ videoId }) => videoId === video.id),

			boxarts
			.filter(({ videoId }) => videoId === video.id)
			.reduce((first, next) => {
				if ((first.width * first.height) <  (next.width * next.height)) return first.url;
				return next.url;
			}), ({ time }, url) => ({
				id: video.id,
				title: video.title,
				time,
				boxart: url,
			})
		)
	)
}))
}
// console.log('excercise 26: \n', JSON.stringify(exc26(), 0, 2));
// -----------------------------------------------------------------------------
/*
Wow! That's a large query, but the code is still small relative to the amount of work it's doing. If we rewrote this query with a series of loops our code would be much less self-describing. Loops don't give the reader any information about the kind of operation being performed. Every time you see a loop, you need to carefully read through the code to find out what's being done. Is it a projection? A filter? A reduction? Why use loops for querying data when we've demonstrated that the 5 functions can be used to create virtually any output we want?

Exercise 27: Stock Ticker

Let's try an easier question. Let's say we have a collection of all of the prices for NASDAQ stocks over time. Every time the price of a stock changes on the NASDAQ ticker an entry is added to this collection. Let's say that ten days ago you bought shares in Microsoft, and now you want to print all of the MSFT share prices since then. Filter the collection for MSFT trades starting from ten days ago and print each price record (including the time stamp) using the print() function. Note: this is not a trick question. It's as easy as it seems.

// The pricesNASDAQ collection looks something like this...

var pricesNASDAQ = [
// ... from the NASDAQ's opening day
{name: "ANGI", price: 31.22, timeStamp: new Date(2011,11,15) },
{name: "MSFT", price: 32.32, timeStamp: new Date(2011,11,15) },
{name: "GOOG", price: 150.43, timeStamp: new Date(2011,11,15)},
{name: "ANGI", price: 28.44, timeStamp: new Date(2011,11,16)},
{name: "GOOG", price: 199.33, timeStamp: new Date(2011,11,16)},
// ...and up to the present.
];

*/
function exc27(pricesNASDAQ, printRecord) {
	var microsoftPrices,
	now = new Date(),
	tenDaysAgo = new Date( now.getFullYear(), now.getMonth(), now.getDate() - 10);

	// use filter() to filter the trades for MSFT prices recorded any time after 10 days ago
	microsoftPrices =
	pricesNASDAQ.filter((priceRecord) => {
		if (priceRecord.name === "MSFT") {
			if (priceRecord.timeStamp.valueOf() >= tenDaysAgo) return priceRecord;
		}
	}) // finish this expression
	// Print the trades to the output console
	microsoftPrices.forEach(function(priceRecord) {
		printRecord(priceRecord);
	});
}
//-----------------------------------------------------------------------------
/*
Exercise 32: Creating a mouse drag event

Remember the exercise we solved earlier? The one in which we retrieved all the movies with a rating of 5.0 from an array of movie lists? If we were to describe the solution in pseudocode it might read something like this...

"For every movie list, retrieve only those videos with a rating of 5.0"

var moviesWithHighRatings =
movieLists.
concatMap(function(movieList) {
return movieList.videos.
filter(function(video) {
return video.rating === 5.0;
});
});

Now we're going to create a mouseDrag event for a DOM object. If we were to describe this problem as pseudocode it might read something like this...

"For every (movie list) mouse down event on the sprite, retrieve only those (videos with a rating of 5.0) mouse move events that occur before the next mouse up event."
*/
function exc32(sprite, spriteContainer) {
	const spriteMouseDowns = Observable
	.fromEvent(sprite, "mousedown");

	const	spriteContainerMouseMoves = Observable
	.fromEvent(spriteContainer, "mousemove");

	const spriteContainerMouseUps = Observable
	.fromEvent(spriteContainer, "mouseup"),

	const spriteMouseDrags =
	// For every mouse down event on the sprite...
	spriteMouseDowns.concatMap((contactPoint) => {
		// ...retrieve all the mouse move events on the sprite container...
		return spriteContainerMouseMoves
		// ...until a mouse up event occurs.
		.takeUntil(spriteContainerMouseUps)
	})
	// --------------------------------------------------------
	//					  INSERT CODE HERE
	// --------------------------------------------------------
	// Complete this expression...
	// For every mouse down event, return the mouse move event
	// sequence until a mouse up event occurs.

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach((dragPoint) => {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
//-----------------------------------------------------------------------------
/*
Exercise 33: Improving our mouse drag event

Our mouse drag event is a little too simple. Notice that when we drag around the sprite, it always positions itself at the top-left corner of the mouse. Ideally we'd like our drag event to offset its coordinates, based on where the mouse was when the mouse down event occurred. This will make our mouse drag more closely resemble moving a real object with our finger.

Let's see if you can adjust the coordinates in the mouse drag event, based on the mousedown location on the sprite. The mouse events are sequences, and they look something like this:

spriteContainerMouseMoves =
seq([ {x: 200, y: 400, layerX: 10, layerY: 15},,,{x: 210, y: 410, layerX: 20, layerY: 26},,, ])

Each item in the mouse event sequences contains an x, y value that represents that absolute location of the mouse event on the page. The moveSprite() function uses these coordinates to position the sprite. Each item in the sequence also contains a pair of layerX and layerY properties that indicate the position of the mouse event relative to the event target.
*/
function exc33(sprite, spriteContainer) {
	// All of the mouse event sequences look like this:
	// seq([ {pageX: 22, pageY: 3423, layerX: 14, layerY: 22} ,,, ])
	var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
	spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
	spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
	// Create a sequence that looks like this:
	// seq([ {pageX: 22, pageY:4080 },,,{pageX: 24, pageY: 4082},,, ])
	spriteMouseDrags =
	// For every mouse down event on the sprite...
	spriteMouseDowns.
	concatMap((contactPoint) => {
		// ...retrieve all the mouse move events on the sprite container...
		return spriteContainerMouseMoves.
		// ...until a mouse up event occurs.
		takeUntil(spriteContainerMouseUps).
		// ------------   INSERT CODE HERE  -----------------
		// Project each mouse move object into a new object
		// with adjusted pageX and pageY properties.
		// Translate each page coordinate based on the value
		// of the layerX and layerY properties in the
		// contactPoint.
		map(({ pageX, pageY }) => {
			return ({
				pageX: pageX - contactPoint.layerX,
				pageY: pageY - contactPoint.layerY,
			})
		})
		// -------------------------------------------------
		// Complete expression...
	});

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach((dragPoint) => {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
//-----------------------------------------------------------------------------
/*
Exercise 35: Sequencing HTTP requests with callbacks

Let's say that we're writing the startup flow for a web application. On startup, the application must perform the following operations:

1. Download the URL prefix to use for all subsequent AJAX calls. This URL prefix will vary based on what AB test the user is enrolled in.

2. Use the url prefix to do the following actions in parallel:
- Retrieve a movie list array
- Retrieve configuration information and...
* make a follow up call for an instant queue list if the config property "showInstantQueue" is truthy
3. If an instant queue list was retrieved, append it to the end of movie list.
4. If all operations were successful then display the movie lists after the window loads. Otherwise inform the user that there was a connectivity error.
*/
function exc35(window, $, showMovieLists, showError) {
	var error,
	configDone,
	movieLists,
	queueList,
	windowLoaded,
	outputDisplayed,
	errorHandler = () => {
		// Otherwise show the error.
		error = "There was a connectivity error";

		// We may be ready to display out
		tryToDisplayOutput();
	},
	tryToDisplayOutput = () => {
		if (outputDisplayed) return;
		if (windowLoaded) {
			if (configDone && movieLists !== undefined) {
				if (queueList !== undefined) {
					movieLists.push(queueList);
				}
				outputDisplayed = true;
				showMovieLists(JSON.stringify(movieLists));
			} else if (error) {
				outputDisplayed = true;
				showError(error);
			}
		}
	},
	windowLoadHandler = () => {
		windowLoaded = true;

		// Remember to unsubscribe from events
		window.removeEventListener("load", windowLoadHandler);

		// This may be the last task we're waiting on, so try and display output.
		tryToDisplayOutput();
	};

	// Register for the load event
	window.addEventListener("load", windowLoadHandler);

	// Request the service url prefix for the users AB test
	$.getJSON(
		"http://api-global.netflix.com/abTestInformation",
		{
			success: (abTestInformation) => {
				// Request the member's config information to determine whether their instant
				// queue should be displayed.
				$.getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/config`, {
					success: (config) => {
						// Parallel retrieval of movie list could've failed,
						// in which case we don't want to issue this call.
						if (!error) {
							// If we're supposed to
							if (config.showInstantQueue) {
								$.getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/queue`, {
									success: (queueMessage) => {
										queueList = queueMessage.list;

										configDone = true;
										tryToDisplayOutput();
									},
									error: errorHandler
								});
							} else {
								configDone = true;
								tryToDisplayOutput();
							}
						}
					},
					error: errorHandler
				}
			);
			// Retrieve the movie list
			$.getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/movieLists`, {
				success: (movieListMessage) => {
					movieLists = movieListMessage.list;
					tryToDisplayOutput();
				},
				error: errorHandler
			});
		},
		error: errorHandler
	});
}
/* Conclusion:
It's fair to say that sequencing HTTP requests with callbacks is very hard. In order to perform two tasks in parallel, we have to introduce a variable to track the status of each task. Every time one of the parallel tasks completes it must check whether its sibling task has also completed. If both have completed, only then can we move forward. In the example above, every time a task is finished the tryToDisplayOutput() function is called to check if the program was ready to display output. This function checks the status of all tasks and displays the output if possible.

With a callback-based API, asynchronous error handling is also very complicated. In synchronous programs, a unit of work is cancelled when an exception is thrown. By contrast, in our program we had to explicitly track whether an error occurred in parallel to prevent an unnecessary call for the instant queue. Javascript provides us with special support for synchronous error handling with the keywords try/catch/throw. Unfortunately no such support is available for asynchronous programs.

The Observable interface is a much more powerful way of working with asynchronous APIs than callbacks. We'll see that Observables can free us from having to track the status of tasks that are run in parallel, just as Observables free us from having to track Event Subscriptions. We'll also see that Observable gives us the same error propagation semantics in asynchronous programs that we expect in synchronous programs. Finally we'll learn that by converting callback-based APIs to Observables, we can query them along with Events to build much more expressive programs.
*/
//-----------------------------------------------------------------------------
/*
Exercise 36: Traversing callback-based Asynchronous APIs

If a callback API were a sequence, what kind of sequence would it be? We've seen that UI Event sequences can contain anywhere from 0 to infinite items, but will never complete on their own.

```js

mouseMoves === seq([ {x: 23, y: 55},,,,,,,{x: 44, y: 99},,,{x:55,y:99},,,{x: 54, y:543},,, ]);

```

In contrast, if we were to convert output from the $.getJSON() function we've been using into a sequence it would always return a sequence that completes after sending a single item.

```js

getJSONAsObservable("http://api-global.netflix.com/abTestInformation") ===
seq([ { urlPrefix: "billboardTest" } ])

```js

It might seem strange to create sequences that contain only one object. We could introduce an Observable-like type specifically for scalar values, but that would make callback-based APIs more difficult to query with Events. Thankfully, an Observable sequence is flexible enough to model both.

So how do we convert a callback API into an Observable sequence? Unfortunately, because callback-based APIs vary so much in their interfaces, we can't create a conversion function like we did with fromEvent(). However there is a more flexible function we can use to build Observable sequences...

Observable.create() is powerful enough to convert any asynchronous API into an Observable. Observable.create() relies on the fact that all asynchronous APIs have the following semantics:

1. The client needs to be able to receive data.
2. The client needs to be able to receive error information.
3. The client needs to be able to be alerted that the operation is complete.
4. The client needs to be able to indicate that they're no longer interested in the result of the operation.

In the following example, we'll use the Observable.create() function to create an Observable that issues a request to getJSON when it's traversed.
*/
function exc36(window, $) {
	var getJSON = (url) => {
		return Observable.create((observer) => {
			var subscribed = true;
			$.getJSON(url, {
				success(data) => {
					// If client is still interested in the results, send them.
					if (subscribed) {
						// Send data to the client
						observer.next(data);
						// Immediately complete the sequence
						observer.complete();
					}
				},
				error(ex) => {
					// If client is still interested in the results, send them.
					if (subscribed) {
						// Inform the client that an error occurred.
						observer.error(ex);
					}
				}
			});

			// Definition of the Subscription objects unsubscribe (dispose in RxJS 4) method.
			return () => {
				subscribed = false;
			}
		});
	};

	var observer = {
		// onNext in RxJS 4
		next(data) => alert(JSON.stringify(data)),
		// onError in RxJS 4
		error(err) => alert(err),
		// onComplete in RxJS 4
		complete() => alert("The asynchronous operation has completed.")
	};

	var subscription = getJSON("http://api-global.netflix.com/abTestInformation")
	.subscribe(observer);

	// setTimeout(function () {
	// 	alert("Changed my mind, I do not want notifications any more!")
	// 	subscription.unsubscribe();
	// }, 10);
}
/* Conclusion
The argument passed into Observable.create() above is known as the subscribe function. Things that might be interested in data that the created Observable might produce (i.e. an Observer) can express this intention by subscribing to it. They must conform to the interface of an Observer in order for notifications pushed by the Observable to be delivered. Observers are then passed as an argument into the subscribe function of the created Observable.

Take note that the subscribe function defined for an Observable represents a lazy evaluation that only occurs for each Observer when it subscribes. Once an Observer no longer interested in the data an Observable has to provide, it should unsubscribe itself. The return value of calling subscribe on an Observable with some Observer is a Subscription, which represents a disposable resource. Calling unsubscribe on a Subscription object will clean up the Observable execution for the corresponding Observer.

Notice that the Observer above defines three methods:

* next(), used by Observables to deliver new data
* error(), used by Observables to deliver error information
* complete(), used by Observables to indicate a data sequence has completed
Observers are not expected to implement all the methods above (i.e. they may be partial). For callbacks that are not provided, Observable execution still proceeds normally, except some types of notifications will be ignored.

Between RxJS 4 and 5, there are some slight API differences to be wary of that relate to the discussion here. Please consult this migration guide for a detailed list of changes.

Now that we've built a version of the getJSON function that returns an Observable sequence, let's use it to improve our solution to the previous exercise...
*/
//-----------------------------------------------------------------------------
/*
Exercise 37: Sequencing HTTP requests with Observable

Let's use the getJSON function that returns Observables, and the Observable.fromEvent() to complete the exercise we completed earlier.
*/
function exc37(window, getJSON, showMovieLists, showError) {
	var movieListsSequence = Observable.zip(
		// 1st arg in the 1st Observable.zip fn
		getJSON("http://api-global.netflix.com/abTestInformation")
		.concatMap((abTestInformation) => Observable.zip(
			// 1st arg in the 2nd Observable.zip fn
			getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/config`)
			.concatMap((config) => {
				if (config.showInstantQueue) {
					return getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/queue`)
					// the resulting array for the 1st arg in the 2nd Observable.zip fn.
					.map((queueMessage) => queueMessage.list);
				} else {
					return Observable.returnValue(undefined);
				}
			}),
			// 2nd arg in the 2nd Observable.zip fn. [returns an array]
			getJSON(`http://api-global.netflix.com/${abTestInformation.urlPrefix}/movieLists`),
			// the 3rd arg in the 2nd Observable.zip fn [returns an array]
			(queueList, movieListsMessage) => {
				var copyOfMovieLists = Object.create(movieListsMessage.list);
				if (queueList !== undefined) {
					copyOfMovieLists.push(queueList);
				}
				return copyOfMovieLists;
			}
		);
	}),
	// second argument in the Observable.zip function
	Observable.fromEvent(window, "load"),
	// returns results of the two zipped arrays...
	(movieLists, loadEvent) => movieLists);

	movieListsSequence.forEach((movieLists) =>
	// there's only going to be one value in the array of "movieLists" since there is only one moment when window.load event is fired.
	showMovieLists(movieLists),
	(err) => showError(err));
}
/* Conclusion
Almost every workflow in a web application starts with an event, continues with an HTTP request, and results in a state change. Now we know how to express the first two tasks elegantly.
*/
//-----------------------------------------------------------------------------
/*
Exercise 38: Throttle Input

When dealing with user input, there will be times when the user's input is too noisy, and will potentially clog your servers with extraneous requests. We want the ability to throttle the users's input so that if they interacting for one second, then we will get the user input. Let's say for example, the user clicks a button once too many times upon saving and we only want to fire after they've stopped for a second.

seq([1,2,3,,,,,,,4,5,6,,,]).throttleTime(1000 ms) === seq([,,,,,,,3,,,,,,,,,,6,,,]);
*/
function exc38(clicks, saveData, name) {
	return clicks
	.throttleTime(1000)
	.concatMap(() => saveData(name))
}
//-----------------------------------------------------------------------------
/*
Exercise 39: Autocomplete Box

One of the most common problems in web development is the autocomplete box. This seems like it should be an easy problem, but is actually quite challenging. For example, how do we throttle the input? How do we make sure we're not getting out of order requests coming back? For example if I type "react" then type "reactive" I want "reactive" to be my result, regardless of which actually returned first from the service.

In the example below, you will be receiving a sequence of key presses, a textbox, and a function when called returns an array of search results.

```js
getSearchResultSet('react') ===

seq[,,,["reactive", "reaction","reactor"]]
keyPresses === seq['r',,,,,'e',,,,,,'a',,,,'c',,,,'t',,,,,]

```
*/
function exc39(getSearchResultSet, keyPresses, textBox) {
	// TODO: Ensure that we only trigger a maximum of one search request per second
	// TODO: Ensure this sequence ends as soon as another key press arrives

	var getSearchResultSets =
	keyPresses
	.map(() => textBox.value)
	.throttleTime(1000)
	.concatMap((text) =>
	getSearchResultSet(text)
	.takeUntil(keyPresses));

	return getSearchResultSets;
}
/* Conclusion
Now that we're able to query with our throttled input, you'll still notice one slight problem. If you hit your arrow keys or any other non character key, the request will still fire. How do we prevent that?
*/
//-----------------------------------------------------------------------------
/*
Exercise 40: Distinct Until Changed Input

You'll notice in the previous exercise that if you pressed your arrow keys while inside the textbox, the query will still fire, regardless of whether the text actually changed or not. How do we prevent that? The distinctUntilChanged filters out successive repetitive values.

```js
seq([1,,,1,,,3,,,3,,,5,,,1,,,]).distinctUntilChanged() ===
seq([1,,,,,,,3,,,,,,,5,,,1,,,]);
```
*/
function exc40(keyPresses, isAlpha) {
	return keyPresses
	.map((e) => String.fromCharCode(e.keyCode))
	// Ensure we only have alphabetic characters
	.filter((character) => isAlpha(character))
	// TODO: Filter out successive repetitive keys
	.distinctUntilChanged()
	// Building up a string of all the characters typed.
	.scan((stringSoFar, character) => stringSoFar + character, '');
}
//-----------------------------------------------------------------------------
/*
Exercise 41: Autocomplete Box Part 2: Electric Boogaloo

In the previous version of the autocomplete box, there were two bugs

Multiple successive searches are made for the same string
Attempts are made to retrieve results for an empty string.
The example below is the same as above, but this time, fix the bugs!
*/
function exc41(getSearchResultSet, keyPresses, textBox) {

	var getSearchResultSets =
		keyPresses
		.map(() => textBox.value)
		.throttleTime(1000)
		.distinctUntilChanged()
		.filter((s) => s.length > 0)
		.concatMap((text) => getSearchResultSet(text).takeUntil(keyPresses));
	return getSearchResultSets;
}
