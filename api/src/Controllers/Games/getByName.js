const axios = require("axios");
const { Videogame, Op, Genre } = require("../../db");
const { YOUR_API_KEY } = process.env;

const getByName = async (name) => {
  try {
    const nameDb = Videogame.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Genre,
        as: "genres",
        attributes: ["name"],
      },
    });
    if (nameDb.legth) {
      return nameDb;
    }
    const nameVideogame = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`
    );
    let gameName = [];
    if (nameVideogame.data) {
      let r = nameVideogame.data.results;
      console.log("acaacca", r);
      gameName = r.map((v) => ({
        name: v.name,
        id: v.id,
        released: v.released,
        background_image: v.background_image,
        genres: v.genres.map((genre) => genre.name),
        rating: v.rating,
        description: v.description_raw,
      }));
      return gameName;
    }
    let results = [...nameDb, ...gameName];

    return results;
  } catch (error) {
    console.log("hola3" + error);
    return { msg: "No se encontro" };
  }
};
module.exports = getByName;