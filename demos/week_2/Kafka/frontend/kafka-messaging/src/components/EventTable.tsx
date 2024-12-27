import React, { useEffect, useState } from 'react'
import { Event, fetchEvents } from '../api/eventService'

function EventTable() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadEvents = async () => {
            const data = await fetchEvents();
            setEvents(data);
        }
        loadEvents();
    }, []);


  return (
    <div>
        <h3>Event Log</h3>
        <table border={1} style={{width:"100%", borderCollapse: "collapse"}}>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Timestamp</th>
                    <th>Recipe Name</th>
                    <th>Description</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                </tr>
            </thead>
            <tbody>
                {
                    events.map((event) => {
                        return (
                            <tr key={event.id}>
                                <td>{event.type}</td>
                                <td>{event.timestamp}</td>
                                <td>{event.data?.name}</td>
                                <td>{event.data?.description}</td>
                                <td>
                                    {event.data?.ingredients && event.data.ingredients.length > 0 ? (
                                        <ul>
                                            {event.data.ingredients.map((ingredient: any, index: any) => (<li key={index}>{ingredient}</li>))}
                                        </ul>
                                        ): ("No Ingredients")
                                    }
                                </td>
                                <td>{event.data?.instructions}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default EventTable