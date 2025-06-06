import { describe, expect, it } from 'vitest';
import { createCommandArgs, escapeValue } from './create-command-args.js';
import type { Options } from './types.js';

describe('createCommandArgs', () => {
  it('should generate correct args for neato layout', () => {
    const options: Options = {
      suppressWarnings: true,
      format: 'svg',
      attributes: {
        graph: <any>{
          foo: 'bar',
        },
        node: <any>{
          baz: 'qux',
        },
        edge: <any>{
          quux: 'quuz',
        },
      },
      library: ['lib1', 'lib2'],
      y: true,
      scale: 1.5,
      layout: 'neato',
      reduce: true,
      noop: 10,
    };

    expect(Array.from(createCommandArgs(options))).toMatchInlineSnapshot(`
      [
        "-q",
        "-Tsvg",
        "-Gfoo=bar",
        "-Nbaz=qux",
        "-Equux=quuz",
        "-s1.5",
        "-llib1",
        "-llib2",
        "-y",
        "-Kneato",
        "-x",
        "-n10",
      ]
    `);
  });

  it('should generate correct args for fdp layout', () => {
    const options: Options = {
      suppressWarnings: false,
      format: 'png',
      attributes: {
        graph: <any>{
          foo: 'bar',
        },
        node: <any>{
          baz: 'qux',
        },
        edge: <any>{
          quux: 'quuz',
        },
      },
      library: ['lib1'],
      y: false,
      scale: 2,
      layout: 'fdp',
      grid: true,
      oldAttractive: true,
      iterations: 5,
      unscaledFactor: 0.5,
      overlapExpansionFactor: 10,
      temperature: 3,
    };
    expect(Array.from(createCommandArgs(options))).toMatchInlineSnapshot(`
      [
        "-Tpng",
        "-Gfoo=bar",
        "-Nbaz=qux",
        "-Equux=quuz",
        "-s2",
        "-llib1",
        "-Kfdp",
        "-LO",
        "-Ln5",
        "-LU0.5",
        "-LC10",
        "-LT3",
      ]
    `);
  });
});

describe('escapeValue', () => {
  it('should escape values correctly', () => {
    expect(escapeValue('foo bar')).toEqual('="foo bar"');
    expect(escapeValue('foo')).toEqual('=foo');
    expect(escapeValue(true)).toEqual('');
    expect(escapeValue(false)).toEqual('=false');
    expect(escapeValue(10)).toEqual('=10');
  });
});
