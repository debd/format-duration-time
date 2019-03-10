import Duration from "./duration";

export default class Formater {
  private _hour: number = 0;
  private _minute: number = 0;
  private _second: number = 0;
  private _inputTokens: Array<string> | null;
  private _formatTokens: {[key: string]: {type: string, func: Function, pad: number}} = {};
  static readonly FORMAT_TOKENS: RegExp = /\*?[Hh]+|\*?m+|\*?s+|\*?ms|./g;
  static readonly TYPE_ORDER = ['hour', 'minute', 'second', 'millisecond'];
  constructor(private duration: Duration, private token: string) {
    this._inputTokens = token.match(Formater.FORMAT_TOKENS);
    this.addFormatToken('h', 'hour', this.calcHour);
    this.addFormatToken('hh', 'hour', this.calcHour, 2);
    this.addFormatToken('m', 'minute', this.calcMin);
    this.addFormatToken('mm', 'minute', this.calcMin, 2);
    this.addFormatToken('s', 'second', this.calcSec);
    this.addFormatToken('ss', 'second', this.calcSec, 2);
  }

  private addFormatToken(token: string, type: string, func: Function, pad: number = 0): void {
    this._formatTokens[token] = {
      type: type,
      func: func,
      pad: pad
    }
  }

  private calcHour = (): number => {
    this._hour = Math.floor(this.duration.millisecond / 3600000);
    return this._hour;
  }

  private calcMin = (): number => {
    this._minute = Math.floor((this.duration.millisecond - this._hour * 3600000) / 60000);
    return this._minute;
  }

  private calcSec = (): number => {
    this._second = Math.floor((this.duration.millisecond - this._hour * 3600000
      - this._minute * 60000) / 1000);
    return this._second;
  }

  private static zeroPad(value: number, length: number): string{
    let s = String(value);
    if (s.length >= length) return s;
    while (s.length < length) s = '0' + s;
    return s;
  }

  private formatFunction(token: string): string {
    if (this._formatTokens[token] && typeof this._formatTokens[token].func === 'function') {
      return Formater.zeroPad(this._formatTokens[token].func(), this._formatTokens[token].pad);
    }
    return token;
  }

  public format(): string {
    if (this._inputTokens === null) return '';
    return this._inputTokens.map(token => this.formatFunction(token)).join('');
  }
}