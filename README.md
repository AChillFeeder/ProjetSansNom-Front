# Décisions prises côté dev:

## Technos choisies:
- Back: NodeJS
- Front: ReactJS

## Répartition des rôles:
### Front:
- Evan et Victor
### Back:
- Léo, Nathanaël et Reda

## Architecture:

# Considérations:
- Utilisateur: comment gérer la suppression des utilisateurs sans casser la base pour garantir de bien suivre la réglementation RGPD
- Négocier le prix: les utilisateurs doivent pouvoir négocier sur les annonces avant de confirmer la transaction

# UML et Diagrammes
![image](https://github.com/user-attachments/assets/86f84b20-7213-41b2-b765-8c16e3a46c92)


# Git flow:

## Branches
**Branche main**: reçoit les releases testée dev, serait la branche déployée, PO execute les tests fonctionnels sur cette branche
**Branche dev**: reçoit les changements de l'équipe dev
**Branche fonctionnalité**: pour chaque fonctionnalité / bugfix, une nouvelle branche est créée, les developpements et les tests pour cette fonctionnalitée se passent sur cette branche

## Régles de nommage:
`#numéro du ticket` et puis assigner le label pertinents à l'issue (bugfix, fonctionnalité, documentation)

**Pour la documentation: les changements partent directement sur `Main`**

