import "./lockScreen.css"



export default function LockScreen() {

    const [date, setDate] = useState(new Date());
    return (
        <div className="lock-screen">
          <div className="date-day-container">
            <div className="date">{date.toLocaleDateString()}</div>
            <div className="day">{date.toLocaleDateString('en-US', { weekday: 'long' })}</div>
          </div>

        </div>
      );
    
}