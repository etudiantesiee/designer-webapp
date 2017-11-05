/**
 * ******************************************************************************************************
 * 																										*
 * Represente un composant de type ellise       														*
 * 																										*
 * ******************************************************************************************************
 */
var component_ellipse = {
		
		get_ellipse : function() {
			
			function EllipseComponent() {
				this.canvas_container_id;
				
				this.nom;
				this.centre;
				this.largeur;
				this.hauteur;
				this.couleur;
				
				this.checkData = function() {
					// Vérification de la bonne conformité du nom du composant à dessiner
					var is_ellipse_param_valid = (typeof this.centre) != 'undefined' 
														&& (typeof this.largeur) != 'undefined'
														&& (typeof this.hauteur) != 'undefined';
					
					if(!is_ellipse_param_valid) {
						return false
					}
					
					return true;
					
				};
				
				this.draw = function(paper) {
					
					if (!this.checkData()) {
						console.error("Les parametres suivant sont invalides " +
								"pour le composant ellipse " + this.nom + " : " +
								"centre : " + this.centre + " " + 
								"largeur : " + this.largeur + " " +
								"hauteur : " + this.hauteur + " " +
								"couleur : " + this.couleur)
						
						console.error("Donnée(s) invalide(s). Aucune ellipse a dessiner pour le composant ellipse " + this.nom)
						return;
					}
					 
					 /**
					  * Dessin des ellipses
					  */
					console.debug("dessin de l'ellipse " + this.nom + " avec les valeurs : " + 
									"centre : " + this.centre + " " + 
									"largeur : " + this.largeur + " " +
									"hauteur : " + this.hauteur + " " +
									"couleur : " + this.couleur)
									
					var ellipse = paper.ellipse(this.centre.x, this.centre.y, this.largeur/2, this.hauteur/2);

					console.log("Fin du dessin de l'ellipse " + this.nom);
					
					return ellipse;
				};
			}
			
			return new EllipseComponent();
		}
};