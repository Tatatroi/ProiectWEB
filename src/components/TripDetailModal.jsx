import { useState } from "react";
import "../css/TripDetailModal.css"; // We'll simplify this CSS too

export default function TripDetailModal({ trip, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState({
    ...trip,
    budget: trip.budget || "",
    accommodation: trip.accommodation || "",
    transportation: trip.transportation || "",
    notes: trip.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTrip(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedTrip);
    }
    setIsEditing(false);
  };

  // Select background image based on destination type
  const getBgImage = () => {
    const dest = trip.destination.toLowerCase();
    if (dest.includes("beach") || dest.includes("resort") || dest.includes("ocean") || dest.includes("sea")) 
      return "url('/src/assets/img3Ocean.jpg')";
    if (dest.includes("mountain") || dest.includes("hiking")) 
      return "url('/src/assets/img1Natura.jpg')";
    if (dest.includes("desert")) 
      return "url('/src/assets/img2Desert.jpg')";
    return "url('/src/assets/defaultTravel.jpg')";
  };

// useEffect(() => {
//   const fetchTrip = async () => {
//     const response = await axios.get(`http://localhost:4000/api/trips`);
//     setTrip(response.data);
//   };

//   fetchTrip();
// }, []);


//   const getBgImageFromAPI = async (trip) => {
//   try {
//     const response = await axios.get(`http://localhost:4000/api/city-image?city=${trip.destination}`);
//     return `url(${response.data.imageUrl})`;
//   } catch (err) {
//     return "url('/src/assets/img4Coral.jpg')"; // fallback
//   }
// };

  return (
    <div className="trip-modal-overlay" onClick={onClose}>
      <div className="trip-modal-content" onClick={e => e.stopPropagation()}>
        {/* <button className="trip-modal-close" onClick={onClose}>×</button> */}
        
        <div className="trip-modal-header" style={{ backgroundImage: getBgImage() }}>
          <button className="trip-modal-close" onClick={onClose}>×</button>
          <div className="trip-header-content">
            <h2>{trip.destination}</h2>
            <p>{trip.date}</p>
          </div>
        </div>
        
        <div className="trip-modal-body">
          {!isEditing ? (
            // View Mode
            <div className="trip-details">
              <h3>Trip Details</h3>
              
              <p className="trip-description">{trip.description}</p>
              
              <div className="trip-details-grid">
                <div className="trip-detail-item">
                  <div className="detail-icon">💰</div>
                  <div className="detail-info">
                    <h4>Budget</h4>
                    <p>{editedTrip.budget || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="trip-detail-item">
                  <div className="detail-icon">🏨</div>
                  <div className="detail-info">
                    <h4>Accommodation</h4>
                    <p>{editedTrip.accommodation || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="trip-detail-item">
                  <div className="detail-icon">✈️</div>
                  <div className="detail-info">
                    <h4>Transportation</h4>
                    <p>{editedTrip.transportation || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="trip-detail-item">
                  <div className="detail-icon">📝</div>
                  <div className="detail-info">
                    <h4>Notes</h4>
                    <p>{editedTrip.notes || "No notes added"}</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="btn btn-primary mt-4"
                onClick={() => setIsEditing(true)}
              >
                Edit Details
              </button>
            </div>
          ) : (
            // Edit Mode
            <div className="trip-edit-form">
              <h3>Edit Trip Details</h3>
              
              <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={editedTrip.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="budget">Budget</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  className="form-control"
                  value={editedTrip.budget}
                  onChange={handleChange}
                  placeholder="e.g. $1,200"
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="accommodation">Accommodation</label>
                <input
                  type="text"
                  id="accommodation"
                  name="accommodation"
                  className="form-control"
                  value={editedTrip.accommodation}
                  onChange={handleChange}
                  placeholder="e.g. Beachside Resort"
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="transportation">Transportation</label>
                <input
                  type="text"
                  id="transportation"
                  name="transportation"
                  className="form-control"
                  value={editedTrip.transportation}
                  onChange={handleChange}
                  placeholder="e.g. Flight + Rental Car"
                />
              </div>
              
              <div className="form-group mb-3">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-control"
                  value={editedTrip.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Additional notes about your trip..."
                />
              </div>
              
              <div className="d-flex justify-content-end mt-4">
                <button 
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}