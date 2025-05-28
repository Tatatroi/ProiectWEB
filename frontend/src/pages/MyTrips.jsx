import { useState, useEffect } from "react";
import TripDetailModal from "../components/TripDetailModal";
import AddTripModal from "../components/AddTripModal";
import { API_URL } from '../config/api'; 

export default function MyTrips({ user }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");



// GET ALL TRIPS

  useEffect(() => {
  // Fetch trips from the database
  const fetchTrips = async () => {
    // Doar încearcă să preia călătoriile dacă avem un utilizator autentificat
    if (!user || !user.id) {
      setTrips([]);
      return;
    }
    
    setLoading(true);
    
    try {
      // Endpoint pentru a prelua călătoriile utilizatorului curent
      const response = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error('Error fetching trips:', error);
      
      
    } finally {
      setLoading(false);
    }
  };

  fetchTrips();
}, [user]); // Reîncarcă datele când utilizatorul se schimbă



  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
  };

  //-----

  //UPDATE TRIP
const handleUpdateTrip = async (updatedTrip) => {
  const formattedTrip = {
    ...updatedTrip,
    date: formatDate(updatedTrip.date)
  };

  try {
    const response = await fetch(`${API_URL}/api/trips/${updatedTrip.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedTrip)
    });

    if (!response.ok) {
      throw new Error('Eroare la actualizarea călătoriei');
    }

    const updatedFromServer = await response.json();
    const updatedTrips = trips.map(trip =>
      trip.id === updatedFromServer.id ? updatedFromServer : trip
    );
    setTrips(updatedTrips);
    setSelectedTrip(null); // închide modalul
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  // ADD TRIP
const handleAddTrip = async (newTrip) => {
  const formattedTrip = {
    ...newTrip,
    user_id: user.id,
    date: formatDate(newTrip.date)
  };

  try {
    const response = await fetch(`${API_URL}/api/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedTrip)
    });

    if (!response.ok) {
      throw new Error('Eroare la adăugarea călătorieiii');
    }

    const savedTrip = await response.json();
    setTrips([...trips, savedTrip]);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

 // DELETE TRIP 
const handleDeleteTrip = async (tripId) => {
  if (!window.confirm("Are you sure you want to delete this trip?")) return;

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trips/${tripId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Eroare la ștergerea călătoriei');
    }

    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);  
    return date.toISOString().split('T')[0];
  
  } catch (e) {
    console.error("Eroare la formatarea datei:", e);
    return dateString;
  }
};






// const handleFilterChange = (e) => {
//   const selected = e.target.value;
//   setFilterType(selected);

//   if (selected === "All") {
//     setFilteredTrips(allTrips);
//   } else {
//     setFilteredTrips(allTrips.filter(trip => trip.type === selected));
//   }
// };



const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice().sort((a, b) => {
  switch (filterType) {
    case "BudgetA":
      return parseFloat(a.budget) - parseFloat(b.budget);
    case "BudgetD":
      return parseFloat(b.budget) - parseFloat(a.budget);
    case "Alphabet":
      return a.destination.localeCompare(b.destination);
    case "DateAsc":
      return new Date(a.date) - new Date(b.date); // cele mai vechi primele
    case "DateDesc":
      return new Date(b.date) - new Date(a.date); // cele mai noi primele
    default:
      return 0;
  }
});



const handleFilterChange = (e) => {
  setFilterType(e.target.value);
};

return(
    <div className="container py-5">
        <h1 className="display-4 fw-bold text-primary my-4 text-center">My Trips</h1>
        <p className="text-center text-muted mb-4">Welcome, {user?.firstName + " " + user?.lastName}!</p>
        {console.log("Aici este userul din myTrips",  user)}
        
        {/* Add Trip Button */}
        <div className="text-center mb-4">
            <button 
            className="btn btn-lg btn-success px-4 py-3 fw-bold shadow"
            onClick={() => setShowAddModal(true)}
            >
            + Add New Trip
            </button>
        </div>

        {/* Filter & Search */}
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-2 filter-search-container">
            {/* Search input */}
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '300px' }}
            />

            <div className="filter-container">
              <label>Sort by:</label>
              <select value={filterType} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="BudgetA">Budget Ascending</option>
                <option value="BudgetD">Budget Descending</option>
                <option value="Alphabet">Alphabetical order</option>
                <option value="DateAsc">Date Oldest to Newest</option>
                <option value="DateDesc">Date Newest to Oldest</option>
              </select>
            </div>
        </div>

        
        
        {/* Trips List */}
        <div className="row g-4">
            {loading ? (
            <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            ) : filteredTrips.length === 0 ? (
            <div className="col-12 text-center">
                <p className="fs-5">You haven't planned any trips yet. Create your first trip!</p>
            </div>
            ) : (
            filteredTrips.map(trip => (
                <div key={trip.id} className="col-md-6 col-lg-4">
                <div className="card shadow h-100">
                    <div className="card-body">
                    <h3 className="card-title">{trip.destination}</h3>
                    <p className="card-text text-muted">🗓️ Date: {formatDate(trip.date)}</p>
                    <p className="card-text">{trip.description}</p>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => handleViewDetails(trip)}
                    >
                        View Details
                    </button>
                    <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteTrip(trip.id)}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </div>
            ))
            )}
        </div>

        {/* Trip Detail Modal */}
        {selectedTrip && (
            <TripDetailModal 
            trip={selectedTrip} 
            onClose={() => setSelectedTrip(null)}
            onUpdate={handleUpdateTrip}
            />
        )}
        
        {/* Add Trip Modal */}
        {showAddModal && (
            <AddTripModal
            onClose={() => setShowAddModal(false)}
            onAddTrip={handleAddTrip}
            />
        )}
        </div>
  );
}