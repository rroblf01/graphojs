/**
 * Client-side playground logic: mounts a CodeMirror editor (into the
 * `.playground__editor` element) and runs the user's code in an isolated
 * iframe (`.playground__frame`) with an import map that resolves `graphojs`
 * to the vendored dist.
 */

export interface PlaygroundOptions {
  /** Initial source code of the example. */
  code: string;
  /** Whether to hide the editor and only show the run frame. */
  readonly?: boolean;
}

export function mountPlayground(root: HTMLElement, opts: PlaygroundOptions): void {
  const initialCode = opts.code ?? '';

  const toolbar = root.querySelector('.playground__toolbar') as HTMLElement | null;
  const runBtn = toolbar?.querySelector('.pg-run') as HTMLButtonElement | null;
  const resetBtn = toolbar?.querySelector('.pg-reset') as HTMLButtonElement | null;
  const editorHost = root.querySelector('.playground__editor') as HTMLElement | null;
  const frameHost = root.querySelector('.playground__frame') as HTMLElement | null;

  if (opts.readonly && editorHost) {
    editorHost.style.display = 'none';
    const split = root.querySelector('.playground__split') as HTMLElement | null;
    if (split) split.style.gridTemplateColumns = '1fr';
  }

  let editor: {
    state: { doc: { toString(): string; length: number } };
    dispatch: (tr: unknown) => void;
  } | null = null;

  if (!opts.readonly && editorHost) {
    void Promise.all([
      import('@codemirror/state'),
      import('@codemirror/view'),
      import('@codemirror/lang-javascript'),
    ]).then(([state, view, js]) => {
      const { EditorState } = state;
      const { EditorView, keymap, lineNumbers, highlightActiveLine } = view;
      const { javascript } = js;

      editor = new EditorView({
        parent: editorHost,
        state: EditorState.create({
          doc: initialCode,
          extensions: [
            lineNumbers(),
            highlightActiveLine(),
            javascript(),
            EditorView.lineWrapping,
            keymap.of([
              {
                key: 'Mod-Enter',
                run: () => {
                  runPlayground();
                  return true;
                },
              },
            ]),
          ],
        }),
      }) as unknown as {
        state: { doc: { toString(): string; length: number } };
        dispatch: (tr: unknown) => void;
      };
    });
  }

  function currentCode(): string {
    if (editor) return editor.state.doc.toString();
    return initialCode;
  }

  function runPlayground(): void {
    const code = currentCode();
    if (!frameHost) return;
    frameHost.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.sandbox = 'allow-scripts allow-same-origin';
    iframe.srcdoc = buildFrameHtml(code);
    frameHost.append(iframe);
  }

  runBtn?.addEventListener('click', runPlayground);
  resetBtn?.addEventListener('click', () => {
    if (editor) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: initialCode },
      });
    }
    runPlayground();
  });

  runPlayground();
}

function buildFrameHtml(code: string): string {
  const imports = {
    imports: {
      graphojs: '/vendor/graphojs/index.js',
      'graphojs/go': '/vendor/graphojs/go.js',
      'graphojs/templates': '/vendor/graphojs/templates.js',
    },
  };
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; height: 100%; }
      #graphojs-root { width: 100%; height: 100%; }
      #graphojs-root > div { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="graphojs-root"></div>
    <script type="importmap">${JSON.stringify(imports)}</script>
    <script type="module">${code}</script>
  </body>
</html>`;
}
