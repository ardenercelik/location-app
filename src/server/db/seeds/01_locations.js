exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Location")
    .del()
    .then(function () {
      return knex("Location").insert([
        { id: 1, url: "rowValue1", name: "name1", latitude: 10.5, longitude: 10 },
        { id: 2, url: "rowValue2", name: "name2", latitude: 11.5, longitude: 11 },
        { id: 3, url: "rowValue3", name: "name3", latitude: 12.5, longitude: 12 },
      ]);
    });
};
