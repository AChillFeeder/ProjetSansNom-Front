import { useState } from "react";
import "./Profil.css";

const Profil = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const storedId = localStorage.getItem("userId");

  //   if (!storedId) {
  //     setError("Utilisateur non connecté.");
  //     setLoading(false);
  //     return;
  //   }

  //   fetch(`${API_URL}/api/currentUser`, {
  //     headers: {
  //       userId: storedId,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Erreur lors de la récupération des données");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setUser(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []); // Exécuter une seule fois au montage

  // if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  // if (error) return <p className="text-center text-red-500">{error}</p>;
  // if (!user) return <p className="text-center text-gray-500">Aucune donnée utilisateur.</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profil utilisateur</h2>
      <div className="profile-content">
        <div className="profile-image">
          <img src={formData.imageUrl} alt="Profile" />
        </div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="profile-input"
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="profile-input"
              />
              <div className="profile-buttons">
                <button onClick={handleSave} className="profile-button save-button">Enregistrer</button>
                <button onClick={handleCancel} className="profile-button cancel-button">Annuler</button>
              </div>
            </>
          ) : (
            <>
              <p className="profile-name">{user.firstName} {user.lastName}</p>
              <p className="profile-email">{user.email}</p>
              <button onClick={() => setIsEditing(true)} className="profile-button edit-button">Modifier</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;