var localStorage = window.localStorage;
var goalDateKey = "pokemon.day.calculator.goal.date";

function initPage(dateGoal) {
    var today = new Date();
    var difference = new Date(dateGoal) - today;
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    if(days > 0) {
        var pokemonToday = pokemonArray[days - 1];
    
        var nameText = "#" + pokemonToday.pkdx_id + " " + pokemonToday.name;
        var desc = pokemonToday.description;
    
        var descFirstHalf = desc.substring(0, desc.length / 2);
        var descSecondHalf = desc.substring(desc.length / 2, desc.length);
        var descFixed = desc;
    
        // Sometiems there are is duplicate description. Check if two halfs of description
        // are identical.
        if (descFirstHalf.trim() == descSecondHalf.trim()) {
            descFixed = descFirstHalf;
        }
    
        $('#name-and-number').html(nameText);
        $('#pokemon-desc').html(descFixed);
        $('#pokemon-img').attr('src', pokemonToday.art_url);
    }


    // Set visible date to footer
    $('#footer-date').html(new Date(dateGoal).toLocaleDateString("fi-FI"));
    $('#footer').show();
}

function dateFromStorage() {
    var itemString = localStorage.getItem(goalDateKey);

    if(itemString) {
        return JSON.parse(itemString);
        return new Date("2021-03-15");
    } else {
        return null;
    }
}

function initDatePicker() {
    $('#goal-date-container').show();
}

function storeDate() {
    var goalDate = $("#goal-date").val();

    if(goalDate) {
        localStorage.setItem(goalDateKey, JSON.stringify(goalDate));
        $('#goal-date-container').hide();
        initPage(goalDate);
    }
}

function resetDate() {
    localStorage.removeItem(goalDateKey);
    location.reload();
}