/**
 * ts-jest AST transformer: rewrites `import.meta` to `globalThis.importMeta`,
 * which jest.setup.js defines. Jest runs CommonJS, where `import.meta` is a
 * syntax error, so Vite-only code (root.tsx, App.tsx, useAmplitude) could not
 * be imported by tests without it.
 */
const name = "import-meta-to-global";
const version = 1;

function factory(tsCompiler) {
  const ts = tsCompiler.configSet.compilerModule;

  return (context) => {
    const visit = (node) => {
      if (
        ts.isMetaProperty(node) &&
        node.keywordToken === ts.SyntaxKind.ImportKeyword &&
        node.name.text === "meta"
      ) {
        return context.factory.createPropertyAccessExpression(
          context.factory.createIdentifier("globalThis"),
          "importMeta",
        );
      }
      return ts.visitEachChild(node, visit, context);
    };

    return (sourceFile) => ts.visitNode(sourceFile, visit);
  };
}

module.exports = { name, version, factory };
