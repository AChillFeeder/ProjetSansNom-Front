import React from "react";
import "./CGU.css";

const CGU = () => {
    return (
        <div className="App">
            <header className="App-header">
                <div className="auth-container">
                    <h1 className="auth-title">Conditions Générales d'Utilisation</h1>

                    <h2>Objet</h2>
                    <p>
                        Les présentes Conditions Générales d’Utilisation (CGU) régissent l’utilisation de la plateforme MEBOOK, un service permettant la revente et le troc d’objets de seconde main. Elles définissent les droits et obligations des utilisateurs ainsi que ceux de MEBOOK en matière de protection des données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD). L’accès et l’utilisation du service impliquent l’acceptation pleine et entière des présentes CGU.
                    </p>

                    <h2>Accès et Utilisation du Service</h2>
                    <p>
                        L’utilisateur s’engage à utiliser MEBOOK conformément aux lois en vigueur et aux présentes CGU. Toute utilisation frauduleuse ou illicite est strictement interdite. L’utilisateur doit fournir des informations exactes et à jour lors de son inscription.
                    </p>

                    <h2>Responsabilité des Utilisateurs</h2>
                    <p>
                        L’utilisateur est seul responsable des informations et contenus qu’il publie sur la plateforme. Les actions suivantes sont strictement interdites : Publication de contenus illégaux, diffamatoires ou offensants. Tentative de piratage, intrusion dans le système ou exploitation de failles de sécurité. Utilisation de la plateforme à des fins frauduleuses ou trompeuses. Tout manquement pourra entraîner des sanctions, y compris la suspension ou la suppression du compte.
                    </p>

                    <h2>Protection des Données Personnelles</h2>
                    <h3>4.1. Collecte et Traitement des Données</h3>
                    <p>
                        MEBOOK applique le principe de minimisation des données en collectant uniquement les informations nécessaires au fonctionnement du service. Les finalités du traitement incluent notamment : La gestion des comptes utilisateurs, la personnalisation de l’expérience utilisateur, la sécurisation et l’amélioration du service. Aucune donnée n’est collectée à l’insu de l’utilisateur. La base légale repose sur : Le consentement explicite de l’utilisateur et l’exécution d’un contrat pour la fourniture des services MEBOOK.
                    </p>

                    <h3>4.2. Droits des Utilisateurs</h3>
                    <p>
                        Conformément au RGPD, les utilisateurs disposent des droits suivants : ✅ Droit d’accès : obtenir une copie des données personnelles détenues. ✅ Droit de rectification : demander la modification des données incorrectes. ✅ Droit à l’effacement : suppression des données sous certaines conditions. ✅ Droit à la limitation du traitement : restreindre temporairement l’utilisation des données. ✅ Droit d’opposition : refuser l’utilisation des données pour certaines finalités. ✅ Droit à la portabilité : récupérer ses données dans un format structuré et lisible. ✅ Droit de retrait du consentement à tout moment. Exercice des droits : Toute demande peut être adressée à mebook_contact@gmail.com, accompagnée d’une preuve d’identité.
                    </p>

                    <h3>4.3. Sécurité et Confidentialité</h3>
                    <p>
                        MEBOOK met en place des mesures de sécurité renforcées pour protéger les données contre tout accès non autorisé, altération ou perte. Seuls les employés et partenaires autorisés peuvent y accéder, sous strictes conditions. Les mots de passe sont stockés sous forme hashée (et prochainement salée) pour éviter toute fuite. Une authentification multi-facteurs (MFA) est recommandée pour renforcer la sécurité des comptes.
                    </p>

                    <h3>4.4. Durée de Conservation des Données</h3>
                    <p>
                        Les données personnelles sont conservées pour une durée limitée et proportionnelle aux finalités du traitement. Une fois expirées, elles sont supprimées ou anonymisées.
                    </p>

                    <h3>4.5. Partage et Transfert des Données</h3>
                    <p>
                        Aucune donnée personnelle n’est vendue à des tiers. Des partenaires techniques (hébergement, maintenance, support) peuvent y accéder uniquement dans le cadre strict du service. En cas de transfert hors de l’UE, des garanties adaptées sont mises en place (ex. : clauses contractuelles types).
                    </p>

                    <h2>Cookies et Suivi</h2>
                    <p>
                        MEBOOK utilise des cookies pour améliorer l’expérience utilisateur et analyser l’audience. L’utilisateur peut : accepter ou refuser les cookies via le bandeau affiché lors de la première connexion, et gérer ses préférences via les paramètres du navigateur. Les cookies strictement nécessaires au fonctionnement du service ne peuvent être désactivés.
                    </p>

                    <h2>Disponibilité du Service</h2>
                    <p>
                        MEBOOK est accessible 24h/24 et 7j/7, sauf en cas de maintenance ou de force majeure. Aucune garantie de disponibilité absolue n’est fournie. L’équipe technique s’efforce d’assurer une continuité optimale du service.
                    </p>

                    <h2>Résiliation du Compte</h2>
                    <p>
                        Suppression volontaire : L’utilisateur peut supprimer son compte à tout moment via les paramètres de son profil. Suppression par MEBOOK : En cas de non-respect des CGU, MEBOOK peut suspendre ou supprimer un compte, avec ou sans préavis. Une suppression entraîne la perte définitive des données associées au compte.
                    </p>

                    <h2>Modification des CGU</h2>
                    <p>
                        MEBOOK se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des changements majeurs via : ✅ une notification dans l’application et ✅ un email envoyé aux utilisateurs enregistrés. La poursuite de l’utilisation du service après modification vaut acceptation des nouvelles CGU.
                    </p>

                    <h2>Réclamations et Contact</h2>
                    <p>
                        Pour toute question relative aux CGU ou à la protection des données, contactez notre Délégué à la Protection des Données (DPO) à [email de contact]. En cas de litige, l’utilisateur peut saisir la CNIL (Commission Nationale de l’Informatique et des Libertés).
                    </p>

                    <h2>Loi Applicable et Juridiction</h2>
                    <p>
                        Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux compétents sont ceux du ressort du siège social de MEBOOK.
                    </p>
                    <button
                        className="back-button"
                        onClick={() => window.location.href = "/"}
                    >
                        Retour Accueil
                    </button>
                </div>
            </header>
        </div>
    );
};

export default CGU;
