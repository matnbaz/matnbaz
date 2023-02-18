export class Timer {
  timerId?: number | null;
  start?: number;

  constructor(private callback: () => unknown, private remaining: number) {
    this.resume();
  }

  pause() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
    this.timerId = null;
    if (this.start) {
      this.remaining -= Date.now() - this.start;
    }
  }

  resume() {
    if (this.timerId) return;
    this.start = Date.now();
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  isPaused() {
    return !this.timerId;
  }
}
