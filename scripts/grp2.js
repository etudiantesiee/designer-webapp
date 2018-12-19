document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "grp2";
	designer.nom = "grp2";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);