$(function() {
  var json
  $.getJSON("data.json", (result) => {
    json = result
  })

  $('.modal').modal();
  $(".submit").click(() => search())

  var search = (str) => {
    var search = $('#search').val().toLowerCase()
    $('.modal-content').html(`
      <h4>You are now subscribed to <span class="teal-text">${search}</span></h4>
      <p>You will get a notification when <span class="teal-text">${search}</span> appears in the news feed.</p>`)

    var relevant = json
      .filter(item => Object.values(item)
        .map(i => i.toLowerCase()).join(" ").includes(search)
      )

    var items = relevant
      .map((i,k) =>
        `<p>
          <h5>${i.title}</h5>
          <h6>
            <a class="orange-text" href="#" onclick="$('#search').val('${i.company}').focus()">${i.company}</a>
            ${i.tags.split(',')
              .map(tag =>
                `<button
                  onclick="$('#search').val('${tag}').focus()"
                  style="background-color: ${stringToColour(tag)}"
                  class="chip right">
                ${tag}</button>`)
              .join('')}
          </h6>
          <p>${i.message}</p>
          <a href="${i.link}">Read more</a>
        </p>`
      )

    $(".ads").html(items.length > 0 ? items : 'No ads with that search')
  }
})

var stringToColour = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) - ((hash << 5) + hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
