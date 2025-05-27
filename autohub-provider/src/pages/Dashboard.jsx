import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const { company } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [stats, setStats] = useState({ total: 0, earnings: 0, rating: 0 });

    useEffect(() => {
        fetch(`/data/${company}/appointments.json`).then(res => res.json()).then(setAppointments);
        fetch(`/data/${company}/services.json`).then(res => res.json()).then(setServices);
        fetch(`/data/${company}/stats.json`).then(res => res.json()).then(setStats);
    }, [company]);

    function renderStars(value) {
        const full = Math.floor(value);
        const half = value % 1 >= 0.25 && value % 1 <= 0.75;
        const empty = 5 - full - (half ? 1 : 0);

        const stars = [];

        for (let i = 0; i < full; i++) {
            stars.push(<FaStar key={`full-${i}`} />);
        }

        if (half) {
            stars.push(<FaStarHalfAlt key="half" />);
        }

        for (let i = 0; i < empty; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} />);
        }

        return stars;
    }

    return (
        <div>
            <div className="top-bar">
                <div className="logo-area">
                    <img src="/src/assets/logo_transparente.png" alt="AutoHub Logo" className='autohub-logo' />
                </div>
                <div className="company-info">
                    <div className="company-text">
                        <span className="company-name">{company} Car Service</span>
                        <div className="stars">{renderStars(stats.stars)}</div>
                    </div>
                    <img
                        src={`/data/${company}/logo.png`}
                        alt={`${company} Logo`}
                        className="company-logo"
                    />
                </div>
            </div>

            <div className="dashboard-container">
                <section className="appointments-section">
                    <header className="dashboard-header">
                        <h1>Upcoming Appointments</h1>
                        <a href="#" className='see-all-link'>See all</a>
                    </header>

                    {appointments.map((a, i) => (
                    <div key={i} className="appointment-card">
                        <h2>{a.date} · {a.time} – {a.title}</h2>
                        <ul>
                        <li>Client: {a.client}</li>
                        <li>Vehicle Type: {a.vehicle}</li>
                        <li>Extras: {a.extras}</li>
                        </ul>
                        <button>See more</button>
                    </div>
                    ))}
                </section>

                <section className="stats-section">
                    <h2>Summary Statistics</h2>
                    <div className="stats-grid">
                        <div className="stat-box">
                            <p><span className='material-icons-round'>build</span></p>
                            <p>Total services this month</p>
                            <p className="stat-value">{stats.total}</p>
                        </div>
                        <div className="stat-box">
                            <p><span className='material-icons-round'>attach_money</span></p>
                            <p>Earnings</p>
                            <p className="stat-value">€{stats.earnings}</p>
                        </div>
                        <div className="stat-box">
                            <p><FaRegStar></FaRegStar></p>
                            <p>Average Rating</p>
                            <p className="stat-value">{stats.rating}</p>
                        </div>
                    </div>
                </section>

                <section className="services-section">
                    <h2>Your Services</h2>
                    <div className="services-grid">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <div className='service-icon'><span className='material-icons-round'>open_in_new</span></div>
                            <div>
                                <h3>{s.title}</h3>
                                <ul>
                                    <li>{s.price}</li>
                                    <li>{s.duration}</li>
                                    <li>{s.details}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </div>
        </div>
    );
}