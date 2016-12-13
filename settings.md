---
layout  : default
title   : "Settings"
---
<div class="container">
    <p><span class="bold">Name: </span><span id="name">placeholder</span></p>
    <p><span class="bold">E-mail address: </span><span id="email">placeholder</span></p>
    <p id="small-margin"><span class="bold">Location: </span></p>
    <p class="location location-street">placeholder 12</p>
    <p class="location location-city">1234 placeholder</p>
    <a href="" class="edit">Edit</a>
    <h2>Change password</h2>
    <div class="form-wrap">
        <form class="settings-form">
            <label for="curr-pw"><i class="fa fa-lock" aria-hidden="true"></i></label><input class="input-settings" type="password" name="curr-pw" placeholder="Current password"><br>
            <label for="new-pw"><i class="fa fa-lock" aria-hidden="true"></i></label><input class="input-settings" type="password" name="new-pw" placeholder="New password"><br>
            <h2>Search options</h2>
            <p><span class="bold">Radius: </span><span id="distance">5 km</span></p>
            <input id="slider" type="range" name="slider" min="1" max="10" step="1" value="5">
            <a class="cancel-link" href="/home.html">Cancel</a>
            <button type="submit" class="settings-btn">Save changes</button>
        </form>
    </div>
</div>