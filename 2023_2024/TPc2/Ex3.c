#include <stdio.h>

// Définition de l'énumération jour
enum Jour {
    lundi, mardi, mercredi, jeudi, dormi, vendredi, samedi, dimanche, nombre_jours
};

enum Jour jour_apres(enum Jour jour_actuel) {
    return (jour_actuel + 1) % nombre_jours;
}

enum Jour decompte_jours(enum Jour jour_depart, int nombre_journees) {
    for (int i = nombre_journees; i > 0; --i) {
        printf("J moins %d !", i);
        
        if (jour_depart == lundi) {
            printf("C'est une nouvelle semaine qui commence.\n");
        } else if (jour_depart == samedi) {
            printf("C'est le week-end.\n");
        } else {
            printf("\n");
        }

        jour_depart = jour_apres(jour_depart);
    }

    printf("Jour J !\n");

    return jour_depart;
}

int main() {
    enum Jour jour_depart = lundi;
    

    jour_depart = decompte_jours(vendredi, 8);

    printf("Nouvelle semaine avec jour 'dormi' :\n");

    jour_depart = decompte_jours(lundi, 13);

    return 0;
}
