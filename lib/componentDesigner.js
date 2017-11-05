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
					var ellipse = paper.ellipse(this.centre.x, this.centre.y, this.largeur, this.hauteur);

					console.log("Fin du dessin de l'ellipse " + this.nom);
					
					return ellipse;
				};
			}
			
			return new EllipseComponent();
		}
};
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
					  * Dessin des ellipses
					  */
					// Construction du chemin de point
					var premierPoint = this.points[0];
					var path = "M " + premierPoint.x + " " + premierPoint.y;
					var nbPoints = this.points.length;
					
					for(i = 1; i < nbPoints; i++) {
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
			
			/**
			 * Fait un appel au backend pour récupérer les données associées à ce composant
			 */
			this.initData = function() {
				var backendHelper = backend_rest_api_utils.get_backend_helper();
				var data = backendHelper.getGraphicalComponentByName(this.nom);
				
				var dataSize = data.length
				
				if(dataSize != 1) {
					console.error("1 seul composant attendu avec le nom : " + this.nom + " mais " + dataSize + " ont été réçus");
					return false
				}
				
				this.ellipses = data[0].ellipses
				this.formesAvecPoints = data[0].formesAvecPoints
				
				return true
			};

			this.drawComponents = function() {

				if (!this.checkData()) {
					console.error("Erreur lors de la validation des données. L'affichage du composant est intérrompu.");
					return;
				}
				
				if (!this.initData()) {
					console.error("Erreur lors de la récupération des données. L'affichage du composant est intérrompu.");
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
/**
 * ******************************************************************************************************
 * 																										*
 * Fournit les elements nécessaires pour effectuer des appels d'API REST vers le backend				*
 * 																										*
 * ******************************************************************************************************
 */
var backend_rest_api_utils = {
		
		get_backend_helper : function() {
			
			function BackEndRestApiUtils() {
				this.backendHostName = "localhost";
				this.backendPort = "8045";
				this.backendServicePath = "/api/items";
				
				this.checkData = function() {
					// Vérification de la bonne conformité du nom du composant à dessiner
					var is_backend_data_valid = (typeof this.backendHostName) != 'undefined' 
														&& (typeof this.backendPort) != 'undefined'
														&& (typeof this.backendServicePath) != 'undefined';
					
					if(!is_backend_data_valid) {
						return false
					}
					
					return true;
					
				};
				
				this.getGraphicalComponentByName = function(name) {
					
					if (!this.checkData()) {
						console.error("Les parametres suivant sont invalides " +
								"pour effectuer un appel vers le backend pour composant " + name + ". Données : " +
								"backendHostName : " + this.backendHostName + " " + 
								"backendPort : " + this.backendPort + " " +
								"backendServicePath : " + this.backendServicePath)
						
						console.error("Donnée(s) invalide(s). Aucun appel vers le backend sera effectué pour le composant " + this.nom)
						return;
					}
					 
					var xhttp = new XMLHttpRequest();
					var backEndRestApiCallUrl = 'http://' + this.backendHostName + ':' + this.backendPort + this.backendServicePath + '?nom=' + name
	        	    xhttp.open("GET", backEndRestApiCallUrl, false);
	        	    xhttp.setRequestHeader("Content-type", "application/json");
	        	    xhttp.send();
	        	    var response = JSON.parse(xhttp.responseText);
	        	    
	        	    console.debug("When calling " + backEndRestApiCallUrl + " Received from back end : " + response)
	        	    
	        	    return response
				};
			}
			
			return new BackEndRestApiUtils();
		}
};