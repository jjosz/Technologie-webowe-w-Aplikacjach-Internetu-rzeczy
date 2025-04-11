import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Połącz z serwerem WebSocket
const socket = io("http://localhost:3000");

// Definicja typu dla danych czujników
interface SensorData {
    temperature: number;
    humidity: number;
    pressure: number;
}

function App() {
    // Stan przechowujący dane czujników z typem SensorData
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [message, setMessage] = useState(""); // Pozostawiamy możliwość wysyłania wiadomości
    const [messages, setMessages] = useState([]); // Pozostawiamy wiadomości, jeśli potrzebujesz

    // Odbieranie danych z serwera WebSocket (np. temperatury, wilgotności, ciśnienia)
    useEffect(() => {
        socket.on("sensor-data", (data: SensorData) => {
            // Odbieranie danych z serwera i dodawanie ich do stanu
            setSensorData((prev) => [data]);
        });

        return () => {
            socket.off("sensor-data");
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>WebSocket IoT Sensor Data</h2>

            <div>
                {/* Wyświetlanie odebranych danych o sensorach */}
                <h3>Otrzymane dane z czujników:</h3>
                {sensorData.map((data, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <p>Temperatura: {data.temperature}°C</p>
                        <p>Wilgotność: {data.humidity}%</p>
                        <p>Ciśnienie: {data.pressure} hPa</p>
                    </div>
                ))}
            </div>

            {/* Sekcja do wysyłania wiadomości */}
            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Wpisz wiadomość..."
                />
                <button onClick={sendMessage}>Wyślij</button>

                {/* Wyświetlanie wysłanych wiadomości */}
                <div>
                    {messages.map((msg, index) => (
                        <p key={index}>💬 {msg}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

