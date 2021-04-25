import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

import {
  exportLineTemplate,
  reactFunctionComponentTemplate,
  testFileTemplate,
  stylesTemplate,
  storiesTemplate,
} from "../../templates";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.equal(-1, [1, 2, 3].indexOf(5));
    assert.equal(-1, [1, 2, 3].indexOf(0));
  });

  const componentName = "TestComponent";

  // Component Templates

  test("Single qoutes in Component", () => {
    const tpl = reactFunctionComponentTemplate(componentName, true);
    assert.strictEqual(tpl.indexOf(`import React from 'react';`), 0);
    assert.notStrictEqual(tpl.indexOf(`export interface ${componentName}Props {`), -1);
    assert.notStrictEqual(tpl.indexOf(`export function ${componentName}({prop = 'default value'}: ${componentName}Props) {`), -1);
  });

  test("Doublue qoutes in Component", () => {
    const tpl = reactFunctionComponentTemplate(componentName, false);
    assert.strictEqual(tpl.split(`'`).length, 1);
    assert.strictEqual(tpl.indexOf(`import React from "react";`), 0);
    assert.notStrictEqual(tpl.indexOf(`export interface ${componentName}Props {`), -1);
    assert.notStrictEqual(tpl.indexOf(`export function ${componentName}({prop = "default value"}: ${componentName}Props) {`), -1);
  });

  // Test Templates

  test("Single qoutes in Test", () => {
    const tpl = testFileTemplate(componentName, true);
    assert.strictEqual(tpl.indexOf(`import React from 'react';`), 0);
    assert.notStrictEqual(tpl.indexOf(`import {${componentName}} from '../${componentName}';`), -1);
  });

  test("Doublue qoutes in Test", () => {
    const tpl = testFileTemplate(componentName, false);
    assert.strictEqual(tpl.split(`'`).length, 1);
    assert.strictEqual(tpl.indexOf(`import React from "react";`), 0);
    assert.notStrictEqual(tpl.indexOf(`import {${componentName}} from "../${componentName}";`), -1);
  });

  // Stories Templates

  test("Single qoutes in Stories", () => {
    const tpl = storiesTemplate(componentName, true, true);
    assert.strictEqual(tpl.indexOf(`import React from 'react';`), 0);
    assert.notStrictEqual(tpl.indexOf(`import {${componentName}, ${componentName}Props} from './${componentName}';`), -1);
  });

  test("Doublue qoutes in Stories", () => {
    const tpl = storiesTemplate(componentName, true, false);
    assert.strictEqual(tpl.split(`'`).length, 1);
    assert.strictEqual(tpl.indexOf(`import React from "react";`), 0);
    assert.notStrictEqual(tpl.indexOf(`import {${componentName}, ${componentName}Props} from "./${componentName}";`), -1);
  });

});
