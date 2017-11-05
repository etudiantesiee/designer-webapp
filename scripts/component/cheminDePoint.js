/**
 * ******************************************************************************************************
 * 																										*
 * Represente un composant faire d'une chemin de point       														*
 * 																										*
 * ******************************************************************************************************
 */
var component_path_shape = {
		
		get_path_shape : function() {
			
			function PathShapeComponent() {
				this.canvas_container_id;
				
				this.points;
				this.couleurTraitsLaison;
				this.traitDeLaisonFin;
				this.relierLesPointsExtremes;
				this.couleur;
				
				this.checkData = function() {
					// Vérification de la bonne conformité du nom du composant à dessiner
					var is_shapes_param_valid = (typeof this.points) != 'undefined' 
														&& (typeof this.relierLesPointsExtremes) != 'undefined';
					
					if(!is_shapes_param_valid) {
						return false
					}
					
					return true;
					
				};
				
				this.draw = function(paper) {
					
					if (!this.checkData()) {
						console.error("Les parametres suivant sont invalides " +
								"pour le composant chemin de point " + this.nom + " : " +
								"points : " + this.points + " " + 
								"couleurTraitsLaison : " + this.couleurTraitsLaison + " " +
								"traitDeLaisonFin : " + this.traitDeLaisonFin + " " +
								"relierLesPointsExtremes : " + this.relierLesPointsExtremes + " " +
								"couleur : " + this.couleur)
						
						console.error("Donnée(s) invalide(s). Aucune forme (faite de points reliés entre eux) a dessiner pour le composant " + this.nom)
						return;
					}
					
					 /**
					  * Dessin du chemin
					  */
					// Construction du chemin de point
					var premierPoint = this.points[0];
					var path = "M " + premierPoint.x + " " + premierPoint.y;
					var nbPoints = this.points.length;
					
					for(var i = 1; i < nbPoints; i++) {
						path += " L " + this.points[i].x + " " + this.points[i].y
					}
					
					path += (this.relierLesPointsExtremes ? " Z" : "")
					
					console.debug("Chemin utilisé pour la construction de la forme : " + path)
					
					var cheminDePointsObject = paper.path(path);

					console.log("Fin du dessin de la forme faite de points " + this.nom);
					
					return cheminDePointsObject
				};
			}
			
			return new PathShapeComponent();
		}
};