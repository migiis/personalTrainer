import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function MyCalendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const events = trainings.map((training) => {
        return {
            title: training.activity + " / " + training.customer.lastname,
            start: moment(training.date).toDate(),
            end: moment(training.date).add(training.duration, 'minutes').toDate()
        }
    })

    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            style={{ height: 600 }}
            />
        </div>
    )
}

export default MyCalendar;