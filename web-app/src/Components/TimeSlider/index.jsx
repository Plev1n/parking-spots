import React, { Component } from 'react'

export default class TimeSlider extends Component {
    render() {
        let hours = 1;
        const minutes = 30;
        return (
            <div style={{display: 'flex', flexDirection: 'row', gap: 10, margin: "0 auto", border: "rgba(0, 0, 0, 0.23) solid 1px", borderRadius: '4px', width: "400px", marginTop: "15px"}}>
                <p>&lt;</p>
                <p>{`${hours}h:${minutes}min`}</p>
                <p>&gt;</p>
            </div>
        )
    }
}

