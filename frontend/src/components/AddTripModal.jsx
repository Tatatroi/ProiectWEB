import { useState } from "react";
import "../css/TripDetailModal.css";
import img1Natura from "../assets/img1Natura.jpg";

export default function AddTripModal({ onClose, onAddTrip }) {
  const [newTrip, setNewTrip] = useState({
    destination: "",
    date: "",
    description: "",
    budget: "",
    accommodation: "",
    transportation: "",
    notes: ""
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newTrip.destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    
    if (!newTrip.date.trim()) {
      newErrors.date = "Date is required";
    }
    
    if (!newTrip.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate a unique ID for the new trip
      const tripToAdd = {
        ...newTrip,
        id: Date.now(), // Simple way to generate a unique ID
        budget: newTrip.budget.trim() || "-",
        accommodation: newTrip.accommodation.trim() || "-",
        transportation: newTrip.transportation.trim() || "-",
        notes: newTrip.notes.trim() || "-"
      };
      
      onAddTrip(tripToAdd);
      onClose();
    }
  };

  return (
    <div className="trip-modal-overlay" onClick={onClose}>
      <div className="trip-modal-content" onClick={e => e.stopPropagation()}>
        <div className="trip-modal-header" style={{ backgroundImage: `url(${img1Natura})` }}>
        <button className="trip-modal-close" onClick={onClose}>×</button>
          <div className="trip-header-content">
            <h2>Add New Trip</h2>
          </div>
        </div>
        
        <div className="trip-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="destination">Destination *</label>
              <input
                type="text"
                id="destination"
                name="destination"
                className={`form-control ${errors.destination ? 'is-invalid' : ''}`}
                value={newTrip.destination}
                onChange={handleChange}
                placeholder="e.g. Beach Resort"
              />
              {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                value={newTrip.date}
                onChange={handleChange}
              />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                value={newTrip.description}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us about your trip..."
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="budget">Budget <span className="text-muted">(optional)</span></label>
              <input
                type="text"
                id="budget"
                name="budget"
                className="form-control"
                value={newTrip.budget}
                onChange={handleChange}
                placeholder="e.g. $1,200"
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="accommodation">Accommodation <span className="text-muted">(optional)</span></label>
              <input
                type="text"
                id="accommodation"
                name="accommodation"
                className="form-control"
                value={newTrip.accommodation}
                onChange={handleChange}
                placeholder="e.g. Beachside Resort"
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="transportation">Transportation <span className="text-muted">(optional)</span></label>
              <input
                type="text"
                id="transportation"
                name="transportation"
                className="form-control"
                value={newTrip.transportation}
                onChange={handleChange}
                placeholder="e.g. Flight + Rental Car"
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="notes">Notes <span className="text-muted">(optional)</span></label>
              <textarea
                id="notes"
                name="notes"
                className="form-control"
                value={newTrip.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Additional notes about your trip..."
              />
            </div>
            
            <div className="d-flex justify-content-end mt-4">
              <button 
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-success"
              >
                Create Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}