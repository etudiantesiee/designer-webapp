document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "grp0";
	designer.nom = "grp0";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);