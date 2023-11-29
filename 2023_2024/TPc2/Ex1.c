#include <stdio.h>

// Définition de la structure Pokemon
struct Pokemon {
    char nom[20];
    int numero;
    float taille;
    float poids;
};

// Définition de la fonction affiche_pokemon
void affiche_pokemon(struct Pokemon p) {
    printf("%s No. %d\n", p.nom, p.numero);
    printf("Taille : %.6f m\n", p.taille);
    printf("Poids : %.6f kg\n", p.poids);
    printf("\n");
}

int main() {

    struct Pokemon pikachu = {"Pikachu", 25, 0.4, 6.0};
    struct Pokemon missingno = {"MissingNo.", 0};
    affiche_pokemon(pikachu);
    affiche_pokemon(missingno);

    return 0;
}
