/**
 * ****************************************************************************************************** *
 * Création des objets graphiques * *
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
				// Vérification de la bonne conformité du nom du composant à
				// dessiner
				var is_component_name_valid = ((typeof this.nom) !== 'undefined');

				if (!is_component_name_valid) {
					console.error("Le nom du composant est invalid.");
					return false;
				}

				console
						.info("Validation des donnees terminé... Affichage du composant "
								+ this.nom + " en cours");

				return true;

			};

			this.drawComponents = function() {

				if (!this.checkData()) {
					console
							.error("Erreur lors de la validation des données. L'affichage du composant est intérrompu.");
					return;
				}

				var paper = new Raphael(document
						.getElementById(this.canvas_container_id));

				Raphael.prototype.drawComponent = function(objectToDraw) {
					return objectToDraw.draw(this);
				};

				/**
				 * Dessin des ellipses
				 */
				if((typeof this.ellipses) !== 'undefined') {
					var nbEllipse = this.ellipses.length
	
					console.info("Le composant " + this.nom + " contient " + nbEllipse + " ellipses (ou cercles)")
					for (var i = 0; i < nbEllipse; i++) {
						var currentEllipse = this.ellipses[i]
						var currentEllipseName = this.nom + "_ellipse_" + i
						
						console.log("Dessin de l'ellipse " + currentEllipseName + " avec l'ID " + currentEllipse.id)
						var ellipse = component_ellipse.get_ellipse();
	
						// Propriétés de l'ellipse courante à dessiner
						ellipse.canvas_container_id = this.canvas_container_id;
						ellipse.nom = currentEllipseName ;
						ellipse.centre = currentEllipse.centre;
						ellipse.largeur = currentEllipse.l;
						ellipse.hauteur = currentEllipse.h;
						ellipse.couleur = currentEllipse.couleur;
	
						// Dessin de l'ellipse en cours
						var ellipse_object = paper.drawComponent(ellipse)
					}
	
					console.log("Dessin des ellipses terminé pour le composant " + this.nom);
				}

				/**
				 * Dessin des formes avec des points
				 * 
				 */
				if((typeof this.formesAvecPoints) !== 'undefined') {
					var nbFormeAvecPoints = this.formesAvecPoints.length
	
					console.info("Le composant " + this.nom + " contient " + nbFormeAvecPoints + " forme(s) définit à partir de points")
					for (var i = 0; i < nbFormeAvecPoints; i++) {
						var currentFormeAvecPoint = this.formesAvecPoints[i]
						var currentFormeAvecPointsName = this.nom + "_forme_avec_points_" + i
						
						console.log("Dessin de la forme " + currentFormeAvecPointsName + " avec l'ID " + currentFormeAvecPoint.id)
						var formeAvecPoint = component_path_shape.get_path_shape();
	
						// Propriétés de l'formeAvecPoint courante à dessiner
						formeAvecPoint.canvas_container_id = this.canvas_container_id;
						formeAvecPoint.nom = currentFormeAvecPointsName;
						formeAvecPoint.points = currentFormeAvecPoint.points ;
						formeAvecPoint.couleurTraitsLaison = currentFormeAvecPoint.couleurTraitsLaison;
						formeAvecPoint.traitDeLaisonFin = currentFormeAvecPoint.traitDeLaisonFin;
						formeAvecPoint.relierLesPointsExtremes = currentFormeAvecPoint.relierLesPointsExtremes;
						formeAvecPoint.couleur = currentFormeAvecPoint.couleur;
	
						// Dessin de l'formeAvecPoint en cours
						var formeAvecPointObject = paper.drawComponent(formeAvecPoint)
					}
					console.log("Dessin des formes avec points terminé pour le composant " + this.nom);
				}

			};
		}

		return new esieeComponentDesigner();
	}
};