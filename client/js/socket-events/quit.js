"use strict";

const $ = require("jquery");
const chat = $("#chat");
const socket = require("../socket");
const sidebar = $("#sidebar");

socket.on("quit", function(data) {
	const id = data.network;
	const network = sidebar.find(`.network[data-uuid="${id}"]`);

	network.children(".chan").each(function() {
		// this = child
		chat.find($(this).attr("data-target")).remove();
	});

	network.remove();

	const chan = sidebar.find(".chan");

	if (chan.length === 0) {
		sidebar.find(".empty").show();

		// Open the connect window
		$("#footer .connect").trigger("click", {
			pushState: false,
		});
	} else {
		chan.eq(0).trigger("click");
	}
});
