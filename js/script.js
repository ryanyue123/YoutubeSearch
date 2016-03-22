$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');

	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		}, 400);
		$(icon).animate({
			right:'10px'
		}, 400);
	});

	$(searchField).on('blur', function(){
		if (searchField.val() == "") {
			$(searchField).animate({
				width:'45%'
			}, 400);
			$(icon).animate({
				right:'360px'
			}, 400);
		}
	});
	$('#search-form').submit(function(e)
		{
			e.preventDefault()
		});

})

function search()
{
	$('#results').html('');
	$('#buttons').html('');

	var q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			type: "video",
			key: "AIzaSyAMAjXUFHHvuSSdXE9LvdbSJgzL3dc65hg"
		},
		function(data)
		{
			var nextPageToken = data.nextPageToken;
			var previousPageToken = data.previousPageToken;
			console.log(data);

			$.each(data.items, function(i, item)
			{
				var output = getOutput(item);
				console.log(i + "\t" + item)
				$('#results').append(output);
			});

			var buttons = getButtons(q, previousPageToken, nextPageToken);
			$('#buttons').append(buttons)
		}
	);
}

function nextPage()
{
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	$('#results').html('');
	$('#buttons').html('');

	var q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyAMAjXUFHHvuSSdXE9LvdbSJgzL3dc65hg"
		},
		function(data)
		{
			var nextPageToken = data.nextPageToken;
			var previousPageToken = data.prevPageToken;
			console.log(data);

			$.each(data.items, function(i, item)
			{
				var output = getOutput(item);
				console.log(i + "\t" + item)
				$('#results').append(output);
			});

			var buttons = getButtons(q, previousPageToken, nextPageToken);
			$('#buttons').append(buttons);
		}
	);
}

function previousPage()
{
	var token = $('#previous-button').data('token');
	var q = $('#previous-button').data('query');

	$('#results').html('');
	$('#buttons').html('');

	var q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search", 
		{
			part: "snippet, id",
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyAMAjXUFHHvuSSdXE9LvdbSJgzL3dc65hg"
		},
		function(data)
		{
			var nextPageToken = data.nextPageToken;
			var previousPageToken = data.prevPageToken;
			console.log(data);

			$.each(data.items, function(i, item)
			{
				var output = getOutput(item);
				console.log(i + "\t" + item)
				$('#results').append(output);
			});

			var buttons = getButtons(q, previousPageToken, nextPageToken);
			$('#buttons').append(buttons);
		}
	);
}


function getOutput(item)
{
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;


	var output = "<li>" + 
		"<div class = 'list-left'>" +
			"<img src ='" + thumb + "'>" +
		"</div>" +
		"<div class = 'list-right'>" +
			"<h3><a class = 'fancybox fancybox.iframe' href = 'http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" +
			"<small>By <span class = 'cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" +
			"<p>" + description + "</p>" +
		"</div>" + 
		"</li>" + 
		"<div class = 'clearfix'></div>" + 
		"";

	return output;
}

function getButtons(q, previousPageToken, nextPageToken)
{
	if(!previousPageToken)
	{
		var btnoutput = "<div class = 'button-container'>" + 
						"<button id = 'next-button' class = 'paging-button' data-token='" + nextPageToken + "' data-query = '" + q + "' + onclick = 'nextPage();'>" +
							"Next Page" + 
						"</button>" +
						"</div>";
	}
	else
	{
		var btnoutput = "<div class = 'button-container'>" + 
						"<button id = 'previous-button' class = 'paging-button' data-token='" + previousPageToken + "' data-query = '" + q + "' + onclick = 'previousPage();'>" +
							"Previous Page" + 
						"</button>" +
						"<button id = 'next-button' class = 'paging-button' data-token='" + nextPageToken + "' data-query = '" + q + "' + onclick = 'nextPage();'>" +
							"Next Page" + 
						"</button>" +
						"</div>";
	}
	return btnoutput;
}




