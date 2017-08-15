var rend = window.jsrender;
function renderTmpl(id){
	var markup = document.getElementById(id).innerHTML;
    var tmpl = rend.templates(markup);
	return tmpl;
}