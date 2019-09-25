function createMenuData(data) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    var child_array = [];
    data_array = data[i].split("/");
    if (data_array.length > 1) {
      if (result.length === 0) {
        child_array.push(data_array[1]);
        result.push({ ["title"]: data_array[0], ["data"]: child_array });
      } else {
        let j = 0;
        for (; j < result.length; j++) {
          const entry = result[j];
          if (entry.title === data_array[0]) {
            entry.data.push(data_array[1]);
            break;
          }
        }
        if (j >= result.length) {
          child_array.push(data_array[1]);
          result.push({ ["title"]: data_array[0], ["data"]: child_array });
        }
      }
    }
  }
}

describe("menu Data Generator", () => {
  it("creates correct data structure ", () => {
    const data = [
      "parent1/parent1child",
      "parent1/parent1child2",
      "parent2/parent2child",
      "parent2/parent2child2",
      "parent1/parent1child3",
      "parent3",
      "parent3/parent3child1",
      "parent4"
    ];

    const expectedResult = [
      {
        title: "parent1",
        data: ["parent1child", "parent1child2", "parent1child3"]
      },
      { title: "parent2", data: ["parent2child", "parent2child2"] },
      { title: "parent3", data: ["parent3child1"] }
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});
