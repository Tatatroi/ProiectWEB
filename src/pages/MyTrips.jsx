import { useState, useEffect } from "react";
import TripDetailModal from "../components/TripDetailModal";
import AddTripModal from "../components/AddTripModal";

export default function MyTrips({ user }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

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
      const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
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
    const response = await fetch(`http://localhost:4000/api/trips/${updatedTrip.id}`, {
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
    const response = await fetch('http://localhost:4000/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedTrip)
    });

    if (!response.ok) {
      throw new Error('Eroare la adăugarea călătoriei');
    }

    const savedTrip = await response.json();
    setTrips([...trips, savedTrip]);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  
const handleDeleteTrip = async (tripId) => {
  if (!window.confirm("Are you sure you want to delete this trip?")) return;

  try {
    const response = await fetch(`http://localhost:4000/api/trips/${tripId}`, {
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
    
    // Opțiunea 1: Format YYYY-MM-DD (cum aveai inițial)
    // return date.toISOString().split('T')[0];
    
    // Opțiunea 2: Format mai prietenos, de exemplu "21 Mai 2025"
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ro-RO', options);
    
    // Opțiunea 3: Format personalizat, de exemplu "21/05/2025"
    // const day = date.getDate().toString().padStart(2, '0');
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Eroare la formatarea datei:", e);
    return dateString;
  }
};


  //-----

//   return (
//     <div className="container py-5">
//       <h1 className="display-4 fw-bold text-primary my-4 text-center">My Trips</h1>
//       <p className="text-center text-muted mb-4">Welcome, {user?.email}!</p>
      
//       {/* Add Trip Button */}
//       <div className="text-center mb-4">
//         <button className="btn btn-lg btn-success px-4 py-3 fw-bold shadow">
//           + Add New Trip
//         </button>
//       </div>

//       {/* Trips List */}
//       <div className="row g-4">
//         {loading ? (
//           <div className="col-12 text-center">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : trips.length === 0 ? (
//           <div className="col-12 text-center">
//             <p className="fs-5">You haven't planned any trips yet. Create your first trip!</p>
//           </div>
//         ) : (
//           trips.map(trip => (
//             <div key={trip.id} className="col-md-6 col-lg-4">
//               <div className="card shadow h-100">
//                 <div className="card-body">
//                   <h3 className="card-title">{trip.destination}</h3>
//                   <p className="card-text text-muted">Date: {trip.date}</p>
//                   <p className="card-text">{trip.description}</p>
//                 </div>
//                 <div className="card-footer bg-white border-top-0">
//                   <button 
//                     className="btn btn-primary me-2"
//                     onClick={() => handleViewDetails(trip)}
//                   >
//                     View Details
//                   </button>
//                   <button className="btn btn-outline-danger">Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Trip Detail Modal */}
//       {selectedTrip && (
//         <TripDetailModal 
//           trip={selectedTrip} 
//           onClose={() => setSelectedTrip(null)} 
//           onUpdate={handleUpdateTrip}
//         />
//       )}

//       {/* Add Trip Modal */}
//       {showAddModal && (
//         <AddTripModal
//           onClose={() => setShowAddModal(false)}
//           onAddTrip={handleAddTrip}
//         />
//       )}

//     </div>
//   );
return(
    <div className="container py-5">
        <h1 className="display-4 fw-bold text-primary my-4 text-center">My Trips</h1>
        <p className="text-center text-muted mb-4">Welcome, {user?.email}!</p>
        
        {/* Add Trip Button */}
        <div className="text-center mb-4">
            <button 
            className="btn btn-lg btn-success px-4 py-3 fw-bold shadow"
            onClick={() => setShowAddModal(true)}
            >
            + Add New Trip
            </button>
        </div>
        
        {/* Trips List */}
        <div className="row g-4">
            {loading ? (
            <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            ) : trips.length === 0 ? (
            <div className="col-12 text-center">
                <p className="fs-5">You haven't planned any trips yet. Create your first trip!</p>
            </div>
            ) : (
            trips.map(trip => (
                <div key={trip.id} className="col-md-6 col-lg-4">
                <div className="card shadow h-100">
                    <div className="card-body">
                    <h3 className="card-title">{trip.destination}</h3>
                    <p className="card-text text-muted">Date: {trip.date}</p>
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