---
layout  : default
title   : "Search"
---
<div class="container">
    <form class="search-form">
        <label for="search-input"><i class="fa fa-search" aria-hidden="true"></i></label>
        <input type="text" placeholder="Search" name="search-content" id="search-content" class="search-input"/>
        <br>
        <label for="search-category"><i class="fa fa-tag" aria-hidden="true"></i></label>
        <input list="categories" name="search-category" id="search-category" class="search-input" placeholder="Category">
            <datalist id="categories">
                <option value="Beauty"></option>
                <option value="Oxfam Wereldwinkel"></option>
                <option value="bio-voedingswinkels"></option>
                <option value="copycenter"></option>
                <option value="dieren"></option>
                <option value="ecologisch bouwen"></option>
                <option value="eet-en-drankgelegenheden"></option>
                <option value="frituur"></option>
                <option value="infopunten"></option>
                <option value="kledij- en stoffenwinkels"></option>
                <option value="kringloop- en recupwinkels"></option>
                <option value="markten"></option>
                <option value="ontbijt-en-koffie"></option>
                <option value="sociale-restaurants"></option>
                <option value="speelgoedwinkel"></option>
                <option value="tweedehands"></option>
                <option value="vegetarische-restaurants"></option>
            </datalist>
        <!--<button type="submit" class="search-btn"><i class="fa fa-search" aria-hidden="true"></i> Search</button>-->
    </form>
    <a href="" id="back-to-top" title="Back to top"><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></a>
    <div class="results">
    </div>
</div>