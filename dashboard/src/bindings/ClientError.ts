// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import { ErrorKind } from './ErrorKind';

// implement toString
export class ClientError {
  kind: ErrorKind | undefined;
  causes: Array<string> | undefined;

  constructor(source: Partial<ClientError>) {
    Object.assign(this, source);
  }

  toString(): string {
    // convert camelCase to space separated words
    let kind = '';
    if (this.kind) {
      kind = this.kind.replace(/([A-Z])/g, ' $1').trim();
    }
    let causes = ''
    if (this.causes) {
      causes = this.causes.join(', ');
    }
    if (!kind && !causes) return 'Unknown error';
    return `${kind}${causes ? `: ${causes}` : ''}`;
  }
}
