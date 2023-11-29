#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Définition de la structure infos
struct Infos {
    char pseudo[32];
    int age;
    char genre;
};

typedef struct Infos* Profil;

Profil cree_profil(const char* pseudo, int age, char genre) {
    Profil nouveau_profil = (Profil)malloc(sizeof(struct Infos));

    if (nouveau_profil != NULL) {
        for (int i = 0; i < 32 && pseudo[i] != '\0'; ++i) {
            nouveau_profil->pseudo[i] = pseudo[i];
        }
        nouveau_profil->age = age;
        nouveau_profil->genre = genre;
    }
     return nouveau_profil;
}

void libere_profil(Profil p) {
    free(p);
}

void incremente_age(Profil p) {
    if (p != NULL) {
        p->age+=1;
    }
}

// Fonction pour changer les 'a' en '@' dans le pseudo d'un profil
void change_a_en_arobase(Profil p) {
    if (p != NULL) {
        for (int i = 0; i < 32 && p->pseudo[i] != '\0'; ++i) {
            if (p->pseudo[i] == 'a') {
                p->pseudo[i] = '@';
            }
        }
    }
}

int main() {
    // // Exemple d'utilisation
    // Profil mon_profil = cree_profil("CoolUser", 25, 'H');
    
    // // Vérification de la création du profil
    // if (mon_profil != NULL) {
    //     // Affichage des informations du profil
    //     printf("Pseudo: %s\nAge: %d\nGenre: %c\n", mon_profil->pseudo, mon_profil->age, mon_profil->genre);

    //     // Incrémentation de l'âge et affichage
    //     incremente_age(mon_profil);
    //     printf("Nouvel age: %d\n", mon_profil->age);

    //     // Changement des 'a' en '@' dans le pseudo et affichage
    //     change_a_en_arobase(mon_profil);
    //     printf("Pseudo modifié: %s\n", mon_profil->pseudo);

    //     // Libération de la mémoire allouée pour le profil
    //     libere_profil(mon_profil);
    // }

    return 0;
}
