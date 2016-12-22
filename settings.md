---
layout  : default
title   : "Settings"
---
<div class="container container-settings">
    <p><span class="bold">Name: </span><div id="name"><span class="edit-span">Manaus Transez</span></div></p>
    <p><span class="bold">E-mail address: </span><div id="email"><span class="edit-span">manatran@student.arteveldehs.be</span></div></p>
    <p id="small-margin"><span class="bold">Location: </span></p>
    <p class="location" id="location-street"><span class="edit-span">Industrieweg 232</span></p>
    <p class="location" id="location-city"><span class="edit-span">9030 Gent</span></p>
    <h2>Change password</h2>
    <div class="form-wrap">
        <form class="settings-form">
            <label for="curr-pw"><i class="fa fa-lock" aria-hidden="true"></i></label><input class="input-settings" type="password" name="curr-pw" placeholder="Current password"><br>
            <label for="new-pw"><i class="fa fa-lock" aria-hidden="true"></i></label><input class="input-settings" type="password" name="new-pw" placeholder="New password"><br>
            <h2>Search options</h2>
            <p><span class="bold">Radius: </span><span id="distance">10 km</span></p>
            <input id="slider" type="range" name="slider" min="1" max="20" step="1" value="10">
            <a class="cancel-link" href="/home.html">Cancel</a>
            <button type="submit" class="settings-btn">Save changes</button>
        </form>
    </div>
</div>