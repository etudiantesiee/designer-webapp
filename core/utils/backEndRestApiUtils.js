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