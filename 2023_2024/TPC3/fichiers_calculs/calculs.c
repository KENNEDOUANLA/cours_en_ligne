#include "calculs.h"
#include <math.h>

float distance_lancer(float angle_depart, int force_depart){
	return 3.0*force_depart*force_depart*sin(M_PI/180.0*angle_depart)*cos(M_PI/180.0*angle_depart)/(2.0*GRAVITE);
}

float altitude_a_la_distance(float distance, float angle_depart, int force_depart){
	float cosa = cos(M_PI/180.0*angle_depart);
	float sina = sin(M_PI/180.0*angle_depart);
	float diffd =  2.0*force_depart*force_depart*sin(M_PI/180.0*angle_depart)*cos(M_PI/180.0*angle_depart)/GRAVITE;
	float ratio = distance/diffd;	
	float x = (2 - 2*sqrt(1-ratio))*diffd;
	return -GRAVITE*x*x/(2.0*force_depart*force_depart*cosa*cosa) + x*sina/cosa;
}

float altitude_max(float angle_depart, int force_depart){
	float sina = sin(M_PI/180.0*angle_depart);
	return force_depart*force_depart*sina*sina/2.0/GRAVITE;
}



