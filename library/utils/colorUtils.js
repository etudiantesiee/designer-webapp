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