/**
 * ******************************************************************************************************
 * 																										*
 * Création des objets graphiques																		*
 * 																										*
 * ******************************************************************************************************
 */
var esiee_components = {
		
		get_designer : function() {
			
			function esieeComponentDesigner() {
				this.canvas_container_id;
				
				this.nom;
				this.ellipses;
				this.formesAvecPoints;
				
				
				this.checkData = function() {
					// Vérification de la bonne conformité du nom du composant à dessiner
					var is_component_name_valid = ((typeof this.nom) !== 'undefined');
					
					if (!is_component_name_valid) {
						console.error("Le nom du composant est invalid.");
						return false;
					}
					
					console.info("Validation des donnees terminé... Affichage du composant " + this.nom + " en cours");
					
					return true;
					
				};
				
				this.drawComponent = function() {
					
					if (!this.checkData()) {
						console.error("Erreur lors de la validation des données. L'affichage du composant est intérrompu.");
						return;
					}
					
					var paper = new Raphael(document.getElementById(this.canvas_container_id));
					 
					 /**
					  * Dessin des ellipses
					  */
					 
					var ellipse = paper.ellipse(50, 50, 40, 20);
					console.log("Dessin des ellipses terminé pour le composant : " + this.nom);
					 
					 
					 /**
					  * Dessin des formes avec des points
					  * 
					  */
					var formeAvecPoint = paper.path("M10 10L90 90");
					console.log("Dessin des forme avec point terminé pour le composant : " + this.nom);
					 				 
				};
			}
			
			return new esieeComponentDesigner();
		}
};