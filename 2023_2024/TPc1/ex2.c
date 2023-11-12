#include <stdio.h>
#include <stdlib.h>


// Écrire une fonction somme_diagonale prenant en paramètres une grille d'entiers, un nombre de lignes et un nombre de colonnes, et qui renvoie la somme de tous les éléments se trouvant sur la diagonale.

int somme_diagonale(int** grille, int nb_lignes, int nb_colonnes){
    int somme = 0;

    for (int i = 0; i < nb_lignes; i++){
        if(i<nb_colonnes){
            somme += grille[i][i];
        }    
    }
    return somme;
}


// Écrire une fonction matrice_opposee prenant en paramètres une grille d'entiers, un nombre de lignes et un nombre de colonnes, et qui renvoie une nouvelle grille de mêmes dimensions que la grille originelle et dont chaque élément est remplacé par son opposé (c'est-à-dire si n se trouve dans une case, alors à la place on aura −n).


int** matrice_opposee(int** grille, int nb_lignes, int nb_colonnes){
    int** grille_opposee = malloc(nb_lignes*sizeof(int*)); 
    for(int i = 0; i < nb_lignes; i++){
        grille_opposee[i] =  malloc(nb_colonnes*sizeof(int)); 
    }
    for(int i = 0; i < nb_lignes; i++){
        for(int j = 0; j < nb_colonnes; j++){
            grille_opposee[i][j] = -1 * grille[i][j];
        }
    }
    return grille_opposee;
}

// Écrire une fonction recup_pairs prenant en paramètres une grille d'entiers, un nombre de lignes et un nombre de colonnes, et qui renvoie un tableau contenant tous les éléments pairs de la grille.
//  Pour clore le tableau, on rajoutera un -1 à la fin de ce tableau.
int* recup_pairs(int** grille, int nb_lignes, int nb_colonnes){
    int max_size = 1 + (nb_lignes * nb_colonnes);
    int * pairs = malloc(max_size * sizeof(int *));
    int pair_index = 0;
    for(int i = 0; i < nb_lignes; i++){
        for(int j = 0; j < nb_colonnes; j++){
            if (grille[i][j]%2==0)
            {
                pairs[pair_index] = grille[i][j];
                pair_index++;
            }
        }
    }

    pairs[pair_index] = -1;

    return pairs;
}


// Écrire une fonction maximum_sur_bordure prenant en paramètres une grille d'entiers, un nombre de lignes et un nombre de colonnes, et qui renvoie le nombre maximal de la grille se trouvant sur le bord de la grille (autrement soit sur la première ligne, soit sur la première colonne, soit sur la dernière ligne, soit sur la dernière colonne).

int maximum_sur_bordure(int** grille, int nb_lignes, int nb_colonnes){
    int max = grille[0][0];
    for (int i = 0; i < nb_lignes; i++)
    {
        if ((grille[i][0] > max))
        {
            max = grille[i][0];
        }
    }

    for (int i = 0; i < nb_lignes; i++)
    {
        if ((grille[i][nb_colonnes-1] > max))
        {
            max = grille[i][nb_colonnes-1];
        }
    }

    for (int i = 0; i < nb_colonnes; i++)
    {
        if ((grille[0][i] > max))
        {
            max = grille[0][i];
        }
    }

    for (int i = 0; i < nb_colonnes; i++)
    {
        if ((grille[nb_lignes-1][i] > max))
        {
            max = grille[nb_lignes-1][i];
        }
    }

    return max;
}
    
int main() { 

    int** grille_exemple = malloc(5*sizeof(int*)); 
    for(int i = 0; i < 5; i++){
        grille_exemple[i] =  malloc(2*sizeof(int)); 
    }

    int cpt = 1;
    for(int i = 0; i < 5; i++){
        for(int j = 0; j < 3; j++){
            grille_exemple[i][j] = cpt;
            cpt++;
        }
    }
    
    somme_diagonale(grille_exemple,5,3);
    matrice_opposee(grille_exemple, 5, 3);
    recup_pairs(grille_exemple, 5, 3);
    maximum_sur_bordure(grille_exemple, 5, 3);


    return 0;
}