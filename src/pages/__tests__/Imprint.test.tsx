import React from "react";
import renderer from "react-test-renderer";
import Imprint from "../Imprint";

it("renders correctly", () => {
  const component = renderer.create(<Imprint />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
