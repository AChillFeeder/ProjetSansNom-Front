import { useEffect, useState } from "react";

const Profil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    console.log(storedId);

    if (!storedId) {
      setError("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    fetch("https://localhost:8080/api/currentUser", {
      headers: {
        userId: storedId,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Exécuter une seule fois au montage

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-gray-500">Aucune donnée utilisateur.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Profil utilisateur</h2>
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-lg font-medium">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
