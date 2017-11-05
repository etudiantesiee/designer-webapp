document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "my_canvas_container_id_1";
	designer.nom = "MangaEsiee";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);