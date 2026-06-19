<!DOCTYPE html>
<html>
<head>
    <title>Edit</title>
</head>
<body>

<h1>Edit Listing</h1>

<form action="/listings/<%= listing._id %>?_method=PUT" method="POST">
    <input name="title" value="<%= listing.title %>"><br><br>
    <input name="location" value="<%= listing.location %>"><br><br>
    <input name="price" value="<%= listing.price %>"><br><br>
    <textarea name="description"><%= listing.description %></textarea><br><br>
    <button>Update</button>
</form>

</body>
</html>