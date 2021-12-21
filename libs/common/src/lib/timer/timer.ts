export class Timer {
  timerId: number;
  start: number;

  constructor(private callback: () => unknown, private remaining: number) {
    this.resume();
  }

  pause() {
    window.clearTimeout(this.timerId);
    this.timerId = null;
    this.remaining -= Date.now() - this.start;
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
