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
					
					var colorHelper = color_utils.get_colorHelper()
					
					params = {
							'fill' : colorHelper.buildRaphaelJsRGBA(this.couleur)
						 };
					
					ellipse.attr(params)

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
					
					console.debug("Construction de la forme avec le chemin : " + path)
					
					var cheminDePointsObject = paper.path(path);
					
					var colorHelper = color_utils.get_colorHelper()
					
					var paramsCheminDePointsStyle = {
							'fill' : colorHelper.buildRaphaelJsRGBA(this.couleur),
							'stroke-width': (this.traitDeLaisonFin != null 
													&& this.traitDeLaisonFin !== undefined 
														&& this.traitDeLaisonFin) ? 1 : 4
					};
					
					if(this.couleurTraitsLaison != null && this.couleurTraitsLaison !== undefined) {
						paramsCheminDePointsStyle.stroke = colorHelper.buildRaphaelJsRGBA(this.couleurTraitsLaison)
					}
					
					cheminDePointsObject.attr(paramsCheminDePointsStyle)

					console.log("Fin du dessin de la forme faite de points " + this.nom);
					
					return cheminDePointsObject
				};
			}
			
			return new PathShapeComponent();
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
				this.backendHostName = webappConf.back_end.host;
				this.backendPort = webappConf.back_end.port;
				this.backendServicePath = webappConf.back_end.items_service_path;
				
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
	        	    var responseText = xhttp.responseText
	        	    console.debug("When calling " + backEndRestApiCallUrl + " Received from back end : " + responseText)
	        	    
	        	    var response = JSON.parse(responseText);
	        	    
	        	    
	        	    return response
				};
			}
			
			return new BackEndRestApiUtils();
		}
};
/**
 * ******************************************************************************************************
 * 																										*
 * Fournit les elements nécessaires pour ajuster les images à l'écran                    				*
 * 																										*
 * ******************************************************************************************************
 */
var pixels_utils = {
		
		pixelsHelper : function() {
			
			function PixelsUtils() {
				
				this.ajustPointsPathIntoCanvas = function(pointsPath, paper) {
					var canvas_width = paper.width,
					canvas_height = paper.height;
					
					var screen_width = screen.width,
					screen_height = screen.height;
					
					var rapport_width = canvas_width / screen_width
					var rapport_height = canvas_height / screen_height
					
					console.debug("Replace into canvas with the following data " +
							"canvas_width = " + canvas_width + " " +
							"canvas_height = " + canvas_height + " " +
							"screen_width = " + screen_width + " " +
							"screen_height = " + screen_height + " " +
							"rapport_width = " + rapport_width + " " +
							"rapport_height = " + rapport_height)
					
					var points = pointsPath.points
					var nbPoints = points.length;
					
					for(var i = 0; i < nbPoints; i++) {
						var xTmp = points[i].x
						var yTmp = points[i].y
						
						points[i].x = xTmp * rapport_width
						points[i].y = yTmp * rapport_height
					}
					
				}
				
				this.ajustEllipseIntoCanvas = function(ellipse, paper) {
					var canvas_width = paper.width,
					canvas_height = paper.height;
					
					var screen_width = screen.width,
					screen_height = screen.height;
					
					var rapport_width = canvas_width / screen_width
					var rapport_height = canvas_height / screen_height
					
					console.debug("Replace into canvas with the following data " +
							"canvas_width = " + canvas_width + " " +
							"canvas_height = " + canvas_height + " " +
							"screen_width = " + screen_width + " " +
							"screen_height = " + screen_height + " " +
							"rapport_width = " + rapport_width + " " +
							"rapport_height = " + rapport_height)
					
					ellipse.centre.x = ellipse.centre.x * rapport_width
					ellipse.centre.y = ellipse.centre.y * rapport_height
					
					ellipse.largeur = ellipse.largeur * rapport_width
					ellipse.hauteur = ellipse.hauteur * rapport_height
				}
			}
			
			return new PixelsUtils();
		}
};
/**
 * ******************************************************************************************************
 * 																										*
 * Fournit les elements nécessaires pour traiter les couleurs avec RaphaelJs               				*
 * 																										*
 * ******************************************************************************************************
 */
var color_utils = {
		
		get_colorHelper : function() {
			
			function ColorUtils() {
				
				this.buildRaphaelJsRGBA = function(color) {
					return color != null && color !== undefined ? 
							"rgba(" + color.r * 255 + ", " + color.g * 255 + ", " + color.b * 255 + ", " + color.a + ")" :
								null
				}
			}
			
			return new ColorUtils();
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
						var currentEllipseName = (currentEllipse.nom != null && currentEllipse.nom !== undefined) ? currentEllipse.nom : this.nom + "_ellipse_" + i
						
						console.log("Dessin de l'ellipse " + currentEllipseName + " avec l'ID " + currentEllipse.id)
						var ellipse = component_ellipse.get_ellipse();
	
						// Propriétés de l'ellipse courante à dessiner
						ellipse.canvas_container_id = this.canvas_container_id;
						ellipse.nom = currentEllipseName ;
						ellipse.centre = currentEllipse.centre;
						ellipse.largeur = currentEllipse.l;
						ellipse.hauteur = currentEllipse.h;
						ellipse.couleur = currentEllipse.couleur;
						
						// Ajutement des coordonnées au canvas
						var pixelsHelper = pixels_utils.pixelsHelper();
						pixelsHelper.ajustEllipseIntoCanvas(ellipse, paper)
	
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
						var currentFormeAvecPointsName = (currentFormeAvecPoint.nom != null && currentFormeAvecPoint.nom !== undefined) ? currentFormeAvecPoint.nom : this.nom + "_forme_avec_points_" + i
						
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
						
						// Ajutement des coordonnées au canvas
						var pixelsHelper = pixels_utils.pixelsHelper();
						pixelsHelper.ajustPointsPathIntoCanvas(formeAvecPoint, paper)
	
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
document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "grp2";
	designer.nom = "grp2";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);
document.addEventListener('DOMContentLoaded', function() {
	// Creation du builder
	var designer = esiee_components.get_designer();        	

	// Propriétés du composant à dessiner
	designer.canvas_container_id = "grp6";
	designer.nom = "grp6";

	// Creation du graphique apres chargement de la page
	designer.drawComponents();
}, false);
undefined