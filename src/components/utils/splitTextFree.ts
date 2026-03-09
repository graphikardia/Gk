export class SplitText {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  private elements: HTMLElement[];
  private originals: string[] = [];

  constructor(target: string | string[] | HTMLElement | HTMLElement[], options: { type?: string; linesClass?: string } = {}) {
    const targets = typeof target === "string" ? document.querySelectorAll(target) as unknown as HTMLElement[] : Array.isArray(target) ? target as HTMLElement[] : [target];
    this.elements = Array.from(targets) as HTMLElement[];
    this.chars = [];
    this.words = [];
    this.lines = [];

    const types = options.type || "chars,words,lines";

    this.elements.forEach((el) => {
      if (!el) return;
      this.originals.push(el.innerHTML);
      if (types.includes("lines")) {
        const lines = this.splitLines(el, options.linesClass);
        this.lines.push(...lines);
      }
      if (types.includes("words")) {
        const words = this.splitWords(el);
        this.words.push(...words);
      }
      if (types.includes("chars")) {
        const chars = this.splitChars(el);
        this.chars.push(...chars);
      }
    });
  }

  private splitChars(el: HTMLElement): HTMLElement[] {
    const chars: HTMLElement[] = [];
    const text = el.textContent || "";
    el.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.whiteSpace = "pre";
      el.appendChild(span);
      chars.push(span);
    });
    return chars;
  }

  private splitWords(el: HTMLElement): HTMLElement[] {
    const words: HTMLElement[] = [];
    const text = el.textContent || "";
    el.innerHTML = "";
    text.split(/(\s+)/).forEach((word) => {
      if (word) {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.whiteSpace = "pre";
        el.appendChild(span);
        words.push(span);
      }
    });
    return words;
  }

  private splitLines(el: HTMLElement, linesClass?: string): HTMLElement[] {
    const lines: HTMLElement[] = [];
    const text = el.textContent || "";
    el.innerHTML = "";
    text.split("\n").forEach((lineText) => {
      const div = document.createElement("div");
      div.className = linesClass || "split-line";
      div.style.display = "block";
      div.textContent = lineText;
      el.appendChild(div);
      lines.push(div);
    });
    return lines;
  }

  revert() {
    this.elements.forEach((el, i) => {
      if (el) el.innerHTML = this.originals[i] || "";
    });
  }

  static create(target: string | string[] | HTMLElement | HTMLElement[], options?: { type?: string; linesClass?: string }) {
    return new SplitText(target, options);
  }
}
