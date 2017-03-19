let Draggable = require ('Draggable');
let dragbound = document.getElementById('drag-bound');
let elements = document.getElementsByClassName('draggable');

var positions = {
  head: []
}

let optionsFactory = {
	limit: dragbound,
	setCursor: true,
	onDrag: function (element, x, y) {
		positions.head = [x, y]
	}
};

[...elements].forEach((element) => {
  let options = optionsFactory;
  new Draggable (element, options);
});