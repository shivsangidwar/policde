// Define events for each month as separate arrays
const JanuaryEvents = [{ date: '2024-01-15', title: 'New Year Celebration' }];
const FebruaryEvents = [{ date: '2024-02-14', title: 'Valentine’s Day' }];
const MarchEvents = [{ date: '2024-03-17', title: 'St. Patrick’s Day' }];
const AprilEvents = [{ date: '2024-04-10', title: 'Spring Break Party' }];
const MayEvents = [{ date: '2024-05-01', title: 'Labor Day' }];
const JuneEvents = [{ date: '2024-06-15', title: 'Family Reunion' }];
const JulyEvents = [{ date: '2024-07-04', title: 'Independence Day' }];
const AugustEvents = [{ date: '2024-08-20', title: 'Summer Camp' }];
const SeptemberEvents = [{ date: '2024-09-15', title: 'School Starts' }];
const OctoberEvents = [{ date: '2024-10-31', title: 'Halloween' }];
const NovemberEvents = [{ date: '2024-11-25', title: 'Thanksgiving' }];
const DecemberEvents = [{ date: '2024-12-11', title: 'Christmas' }];

// Combine monthly arrays into an iterable object
const eventsByMonth = {
    January: JanuaryEvents,
    February: FebruaryEvents,
    March: MarchEvents,
    April: AprilEvents,
    May: MayEvents,
    June: JuneEvents,
    July: JulyEvents,
    August: AugustEvents,
    September: SeptemberEvents,
    October: OctoberEvents,
    November: NovemberEvents,
    December: DecemberEvents
};

// Add Symbol.iterator to make eventsByMonth iterable
eventsByMonth[Symbol.iterator] = function* () {
    for (const [month, events] of Object.entries(this)) {
        yield { month, events };
    }
};

// Corrected displayDate function
function displayDate() {
    const dateBox = document.getElementById('dateBox');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    dateBox.innerHTML = `Today's Date: ${formattedDate}`;
}

// Corrected displayCalendar function
function displayCalendar(month, year) {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('monthYear');
    const currentDate = new Date(year, month);

    // Set the month and year in the header
    monthYear.innerHTML = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Create empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // Create the days of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        dayCell.classList.add('day');
        calendarGrid.appendChild(dayCell);
    }
}

// Corrected checkEventNotifications function
function checkEventNotifications() {
    const notificationBox = document.getElementById('notificationBox');
    const currentDate = new Date();
    const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

    // Get events for the current month
    const events = eventsByMonth[currentMonthName] || [];

    // Find the first event within 24 hours
    const upcomingEvent = events.find(event => {
        const eventDate = new Date(event.date);
        const timeDifference = eventDate - currentDate;
        return timeDifference <= 24 * 60 * 60 * 1000 && timeDifference > 0;
    });

    // Display the notification for the first event
    if (upcomingEvent) {
        notificationBox.innerHTML = `Reminder: Event <span>${upcomingEvent.title} </span> is coming up tomorrow on <span> ${upcomingEvent.date} </span>`;
    } else {
        notificationBox.innerHTML = 'No upcoming events within 24 hours.';
    }
}

// Show the calendar for the current month
function showCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.classList.remove('hidden');

    // Get current month and year
    const currentDate = new Date();
    displayCalendar(currentDate.getMonth(), currentDate.getFullYear());
}

// Initialize the display
window.onload = () => {
    displayDate(); // Display current date
    checkEventNotifications(); // Check for upcoming events
};

// Example usage of iterability
for (const { month, events } of eventsByMonth) {
    console.log(`Month: ${month}`);
    events.forEach(event => console.log(` - ${event.title} on ${event.date}`));
}





