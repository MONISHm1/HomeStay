<!DOCTYPE html>
<html>
<head>
    <title>Details</title>
</head>
<body>

<h1><%= listing.title %></h1>
<p>📍 <%= listing.location %></p>
<p>💰 ₹<%= listing.price %></p>
<p><%= listing.description %></p>

<a href="/listings/<%= listing._id %>/edit">✏️ Edit</a>

<form action="/listings/<%= listing._id %>?_method=DELETE" method="POST">
    <button>Delete</button>
</form>

<br>
<a href="/listings">⬅ Back</a>

</body>
</html>