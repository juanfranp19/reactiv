const slugify = (nombreRuta) => {

    return nombreRuta
        .toLowerCase()                      // convierte todo a minúsculas
        .normalize('NFD')                   // descompone acentos ( a => a + ´ )
        .replace(/[\u0300-\u036f]/g, '')    // elimina acentos y diacríticos
        .replace(/[^a-z0-9\s-]/g, '')       // elimina caracteres no alfanuméricos, excepto espacio y guiones
        .replace(/\s+/g, '-')               // reemplaza espacios por guiones
        .replace(/-+/g, '-')                // elimina guiones repetidos
        .replace(/^-+|-+$/g, '');           // elimina guiones al principio y al final
}

export default slugify;
