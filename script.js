let daybox = document.querySelector(".days"),
    monthbox = document.querySelector(".months"),
    yearbox = document.querySelector(".years"),

    daylabel = document.querySelector(".day"),
    monthlabel = document.querySelector(".month"),
    yearlabel = document.querySelector(".year"),

    dayerr = document.querySelector(".validday"),
    montherr = document.querySelector(".validmonth"),
    yearerr = document.querySelector(".validyear"),

    img = document.querySelector(".image");


function Reset() {
    dayerr.style.display = "none"
    montherr.style.display = "none"
    yearerr.style.display = "none"

    daylabel.innerHTML = "- -"
    monthlabel.innerHTML = "- -"
    yearlabel.innerHTML = "- -"
}

function ErrorSet(er, note) {
    er.style.display = "block";
    er.innerHTML = note;
    IS = false;
}

function Feb(ye) {
    for (let i = 2024; i > 0; i = i - 4) {
        if (ye === i) {
            return true
        }
    }
    return false
}

let ma = [1, 3, 5, 7, 8, 10, 12]
let mo = [4, 6, 9, 11]

function Datevalidate(mon, da) {
    if (mo.includes(mon) && da > 30) { ErrorSet(dayerr, "This Date Is Not Valid") }
    else if (mon === 2 && da === 29) { if (!Feb(+(yearbox.value))) { ErrorSet(dayerr, "This Date Is Not Valid") } }
    else if (mon === 2 && da > 28) { ErrorSet(dayerr, "This Date Is Not Valid") }
}

let IS = true;
function Check() {
    Reset();
    IS = true
    if (daybox.value.trim() == "") { ErrorSet(dayerr, "This field is required") }
    else if (+(daybox.value) >= 32) { ErrorSet(dayerr, "Must be a valid day") }

    if (monthbox.value.trim() == "") { ErrorSet(montherr, "This field is required") }
    else if (+(monthbox.value) >= 13) { ErrorSet(montherr, "Must be a valid month") }

    if (yearbox.value.trim() == "") { ErrorSet(yearerr, "This field is required") }
    else if (+(yearbox.value) > new Date().getFullYear()) { ErrorSet(yearerr, "Must be in the past") }

    if (IS) {
        Datevalidate(+(monthbox.value), +(daybox.value))
    }
}

function num(m) {
    let num = 1
    for (let i = m; i !== (new Date().getMonth() + 1); i++) {
        if (i === 12) i = 1
        num++
    }
    return num
}

function WriteDate() {
    let days = Math.abs(daybox.value - new Date().getDate())
    let months = 0
    let years = 0
    if (monthbox.value > new Date().getMonth() + 1) {
        months = num(monthbox.value)
        years = new Date().getFullYear() - yearbox.value - 1
    } else {
        months = new Date().getMonth() - monthbox.value + 1
        years = new Date().getFullYear() - yearbox.value
    }
    daylabel.innerHTML = days
    monthlabel.innerHTML = months
    yearlabel.innerHTML = years
}


img.addEventListener("click", function () {
    Check()
    if (IS) {
        WriteDate()
    }
})