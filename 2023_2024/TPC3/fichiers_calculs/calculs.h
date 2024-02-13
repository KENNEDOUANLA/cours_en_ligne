//Cette constante est celle de la gravité : plus elle est faible, plus le lancer ira loin
#define GRAVITE 9.8

float distance_lancer(float angle_depart, int force_depart);
/** 
Détermine la distance totale du lancer.
@param l'angle de tir au départ, exprimé en degré
@param la force, un entier positif, qui détermine à quelle puissance le caillou sera lancé
@return la distance entre le point d'abscisse 0 et l'endroit où le caillou retombe
**/

float altitude_a_la_distance(float distance, float angle_depart, int force_depart);
/** 
Renvoie la hauteur du caillou lorsqu'il franchit une certaine distance.
@param la distance sur laquelle se base le calcul. Doit être positive
	 et inférieure à la distance totale
@param l'angle de tir au départ, exprimé en degré
@param la force, un entier positif, qui détermine à quelle puissance le caillou sera lancé
@return la hauteur di caillou quand elle est à l'abscisse "distance"
**/

float altitude_max(float angle_depart, int force_depart);
/** 
Renvoie la hauteur maximale du caillou lors de son lancer.
@param l'angle de tir au départ, exprimé en degré
@param la force, un entier positif, qui détermine à quelle puissance le caillou sera lancé
@return la hauteur maximale que peut atteindre le caillou lors de son lancer.
**/
