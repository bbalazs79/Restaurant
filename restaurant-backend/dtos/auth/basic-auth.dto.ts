// A DTO-kat azért érdemes különszedni az src mappából,
// mert ha pl. egy Angular frontend van a backend mellé,
// akkor simán fel lehet használni a frontenden is ezeket
// az interfaceket ahelyett, hogy mindig át lennének másolgatva.
// Lehetséges megoldás egy git submodule.
// Ilyenkor a dtos mappa is egy git repo lesz, a DTO-k egy külön
// git repoban lehetnek, amit a frontend is, meg a backend is lehúz.
// Ha változás van, csak oda kell bevezetni.
// De csak javaslat.

export interface BasicAuthDto {
    username: string;
    password: string;
    role: string;
}