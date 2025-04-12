import * as acorn from "acorn";
import ts from "typescript";

function isValidJavaScript(code: string): boolean {
  try {
    acorn.parse(code, { ecmaVersion: 2020 });
    return true;
  } catch {
    return false;
  }
}

function isValidTypeScript(code: string): boolean {
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext },
    reportDiagnostics: true,
  });
  return !result.diagnostics || result.diagnostics.length === 0;
}

function isLikelyCode(code: string): boolean {
  const keywordRegex =
    /\b(function|const|let|var|if|else|for|while|import|export|class|=>)\b/;
  return keywordRegex.test(code);
}

export default function checkPrompt(prompt: string) {
  if (!prompt) return { result: false, message: "Prompt cannot be empty" };
  if (prompt.trim().length < 10 || !isLikelyCode(prompt)) {
    return {
      result: false,
      message:
        "The provided text doesn't seem to be valid JavaScript/TypeScript code. Please enter actual code before submitting.",
    };
  }
  if (!isValidJavaScript(prompt) || !isValidTypeScript(prompt)) {
    return {
      result: false,
      message:
        "Oops! It seems there are syntax errors or our validator cannot understand your code.\nPlease double-check your JavaScript/TypeScript for any mistakes.\nIf you believe this is a false positive, ignore it.",
      couldBeValid: true,
    };
  }
  return { result: true, message: "" };
}
