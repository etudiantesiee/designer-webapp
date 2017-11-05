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