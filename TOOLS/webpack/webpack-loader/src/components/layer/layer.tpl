<div class="layer2">
	<img src="${require('../../assets/11.jpg')}" alt="" width="50">
  	<div>layer.tpl中的内容<%= name %></div>
  	<% for(var i=0;i<arr.length;i++) { %>
  		<%= arr[i] %>
  	<% } %>
</div>

