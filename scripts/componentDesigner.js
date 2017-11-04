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
				var nbEllipse = this.ellipses.length

				console.info("Le comosant " + this.nom + " contient " + nbEllipse + " ellipses (ou cercles)")
				for (i = 0; i < nbEllipse; i++) {
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

				/**
				 * Dessin des formes avec des points
				 * 
				 */
				var formeAvecPoint = paper.path("M10 10L90 90");
				console.log("Dessin des forme avec point terminé pour le composant " + this.nom);

			};
		}

		return new esieeComponentDesigner();
	}
};