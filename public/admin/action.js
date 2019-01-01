function submitLogin() {
  var param = { username: $("input[name=uname]").val(), password: $("input[name=psw]").val() };
  $.ajax({
    url: "../accounts/authenticate-password",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    type: "POST",
    data: JSON.stringify(param),
    success: function(response) {
      if (response.success == false) {
        alert(response.msg);
      } else {
        localStorage["jwt-token"] = response.token;
        window.location.replace("parts.html");
      }
    }
  });
}

function checkLogin() {
  if (!localStorage["jwt-token"]) {
    window.location.replace("login.html");
  }
}

function getParts() {
  checkLogin();
  $.ajax({
    url: "../cars/list-colors",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    type: "GET",
    beforeSend: function(xhr) {
      /* Authorization header */
      xhr.setRequestHeader("Authorization", localStorage["jwt-token"]);
    },
    success: function(response) {
      $.each(response.colors, function(index, color) {
        addColor("parts", color.id, color.persianName);
        // alert(o);
      });
    }
  });
}

function addColor(contanerId, id, name) {
  var container = $("#" + contanerId);
  var option = $("<div />", { class: "option" });
  $("<input />", { type: "checkbox", id: "cb" + id, value: id }).appendTo(option);
  $("<label />", { for: "cb" + id, text: name }).appendTo(option);
  option.appendTo(container);
}
