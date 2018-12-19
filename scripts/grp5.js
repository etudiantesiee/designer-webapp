document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "grp5";
	designer.nom = "grp5";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);