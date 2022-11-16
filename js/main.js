let wrapper = document.querySelector(".wrapper");
let currentDate = document.querySelector(".current-date");
let currentYear = document.querySelector(".current-year");

const daysTag = document.querySelector(".days"),
  prevNextIcon = document.querySelectorAll(".icons span");

//ham lay ngay thuc te
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = [
  currYear - 4,
  currYear - 3,
  currYear - 2,
  currYear - 1,
  currYear,
  currYear + 1,
  currYear + 2,
  currYear + 3,
  currYear + 4,
  currYear + 5,
  currYear + 6,
  currYear + 7,
];

currentDate.onclick = () => {
  month_list.classList.add("show");
};

currentYear.onclick = () => {
  year_list.classList.add("show");
};

const renderCalendar = (month, year) => {
  let currDate = new Date();
  if (month == null) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  let firstDayofMonth = new Date(year, month, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(year, month + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(year, month, 0).getDate(); // getting last date of previous month
  let liTag = "";

  let curr_month = `${months[month]}`;
  currentDate.innerHTML = curr_month;

  let curr_year = `${year}`;
  currentYear.innerHTML = curr_year;

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 13; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerHTML = `${months[month]} ${year}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

let month_list = wrapper.querySelector(".month-list");
let year_list = wrapper.querySelector(".year-list");

months.forEach((e, index) => {
  // currYear = date.getFullYear(); // updating current year with new date year
  let month = document.createElement("div");
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.querySelector("div").onclick = () => {
    month_list.classList.remove("show");
    currMonth = index;

    renderCalendar(index, currYear);
  };
  month_list.appendChild(month);
});

years.forEach((e, index) => {
  let yearr = document.createElement("div");
  yearr.innerHTML = `<div data-year="${index}">${e}</div>`;
  yearr.querySelector("div").onclick = () => {
    year_list.classList.remove("show");
    currYear = e;

    renderCalendar(currMonth, e);
  };
  year_list.appendChild(yearr);
});

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(currMonth, currYear); // calling renderCalendar function
  });
});

document.querySelector("#year-change-prev").onclick = () => {
  --currYear;
  renderCalendar(currMonth, currYear);
};

document.querySelector("#year-change").onclick = () => {
  ++currYear;
  renderCalendar(currMonth, currYear);
};
